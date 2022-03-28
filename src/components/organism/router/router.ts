import { LitElement, html } from 'lit-element';
import { router } from 'lit-element-router';
import { customElement } from 'lit/decorators';

import '../../atoms/link/link';
import './router-contents';
import '../../pages/new-stories/new-stories';
import '../../pages/item-details/item-details';
import '@kor-ui/kor/components/card'
import '@kor-ui/kor/components/page'
import '@kor-ui/kor/components/app-bar'
import '@kor-ui/kor/components/nav-bar'
import '@kor-ui/kor/components/pane'
import '@kor-ui/kor/components/menu-item'

import { observeState } from 'lit-element-state';
import { appState } from '../../../state/appState';

@customElement('app-router')
@router
export class AppRouter extends observeState(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object }
    };
  }
 
  static get routes() {
    return [{
      name: 'new-stories',
      pattern: '/hn/new',
    }, {
      name: 'top-stories',
      pattern: '/hn/top',
    }, {
      name: 'best-stories',
      pattern: '/hn/best',
    }, {
      name: 'ask-hn',
      pattern: '/hn/ask',
    }, {
      name: 'show-hn',
      pattern: '/hn/show',
    }, {
      name: 'item',
      pattern: '/hn/item/:itemId'
    }, {
      name: 'not-found',
      pattern: '*',
      callback: (route) => route === 'not-found'
        && window.location.replace('/hn/top')
    }];
  }
 
  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};

    // console.log({ appState })
    // debugger;
    // appState.heading = 'bbb';
  }
 
  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log('>>>', route, params, query, data );
  }
 
  render() {
    console.log('rendering router', this.params.itemId, appState)
    console.log({ appState })
    debugger;
    return html`
      <kor-page>
        <kor-app-bar slot="top"><img src="https://news.ycombinator.com/y18.gif" /><h1>Hacker News - ${appState.heading}</h1></kor-app-bar>
        <kor-pane slot="left">
          <nav>
            <app-link href="/hn/new">
              <kor-menu-item label="New Stories" toggle="false"></kor-menu-item>
            </app-link>
            <app-link href="/hn/top">
              <kor-menu-item label="Top Stories" toggle="false"></kor-menu-item>
            </app-link>
            <app-link href="/hn/best">
              <kor-menu-item label="Best Stories" toggle="false"></kor-menu-item>
            </app-link>
            <app-link href="/hn/ask">
              <kor-menu-item label="Ask HN" toggle="false"></kor-menu-item>
            </app-link>
            <app-link href="/hn/show">
              <kor-menu-item label="Show HN" toggle="false"></kor-menu-item>
            </app-link>
          </nav>
        </kor-pane>
        <kor-card>
          <app-router-contents active-route=${this.route}>
              <app-new-stories .page=${this.query.page ?? 1} route='new-stories'></app-new-stories>
              <h1 route='top-stories'>top</h1>
              <h1 route='best-stories'>best</h1>
              <h1 route='ask-hn'>ask</h1>
              <h1 route='show-hn'>show</h1>
              <app-item-details .itemId=${this.params.itemId} route='item'></app-item-details>
              <h1 route='info'>Info ${this.query.data}</h1>
              <h1 route='user'>User ${this.params.id} </h1>
              <h1 route='not-found'>Not Found </h1>
          </app-router-contents>
        </kor-card>
      </kor-page>
    `;
  }
}