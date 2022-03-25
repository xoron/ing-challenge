import { LitElement, html } from 'lit-element';
import { router } from 'lit-element-router';
import { customElement } from 'lit/decorators';

import '../../atoms/link/link';
import './router-contents';

@customElement('app-router')
@router
export class AppRouter extends LitElement {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object }
    };
  }
 
  static get routes() {
    return [{
      name: 'home',
      pattern: '',
      data: { title: 'Home' }
    }, {
      name: 'info',
      pattern: 'info'
    }, {
      name: 'user',
      pattern: 'user/:id'
    }, {
      name: 'not-found',
      pattern: '*'
    }];
  }
 
  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
  }
 
  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log(route, params, query, data);
  }
 
  render() {
    return html`
      <app-link href="/">Home</app-link>
      <app-link href="/info">Info</app-link>
      <app-link href="/info?data=12345">Info?data=12345</app-link>
      <app-link href="/user/14">user/14</app-link>
 
      <app-router-contents active-route=${this.route}>
          <h1 route='home'>Home</h1>
          <h1 route='info'>Info ${this.query.data}</h1>
          <h1 route='user'>User ${this.params.id} </h1>
          <h1 route='not-found'>Not Found </h1>
      </app-main>
    `;
  }
}