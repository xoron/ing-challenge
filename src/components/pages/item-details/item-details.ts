import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { fetchItem } from '../../../api/utils';
import { navigator } from "lit-element-router";
import '@kor-ui/kor/components/tag'
import '../../molecules/comment/comment';
import { observeState } from 'lit-element-state';
import { appState } from '../../../state/appState';

@navigator
@customElement('app-item-details')
export class AppItemDetails extends observeState(LitElement) {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    a {
        text-decoration: none;
    }
  `;

  constructor() {
      super();
      console.log('constructor called', this.itemId)
      console.log({ appState })

    //   appState.heading = 'ccc'
  }

  fetchStoryItem = () => {
    fetchItem(`https://hacker-news.firebaseio.com/v0/item/${this.itemId}.json`)
          .then(result => {
              this.item = result;
              console.log({ result })
              this.update();
          })
  }

  // Declare reactive properties
  @property()
  item?: any = null;

  // Render the UI as a function of component state
  render() {
      if(!this.item && this.itemId) {
        this.fetchStoryItem()
      }
      console.log('rendering item details', this.itemId)
    const itemId = this.itemId;
    return html`
        <p>this is the app item details ${itemId}</p>
        ${this.item && html`
                <a href=${this.item.url} target="_blank" ><kor-tag label="Title: ${this.item.title}"></kor-tag></a>
                <kor-tag label="Score: ${this.item.score}"></kor-tag>
                <kor-tag label="Username: ${this.item.by}"></kor-tag>
                <kor-tag label="Time: ${this.item.time}"></kor-tag>

                <app-comment .commentIds=${this.item.kids}></app-comment>
        `}
    `;
  }
}