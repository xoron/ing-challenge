import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { fetchItem } from '../../../api/utils';
import { navigator } from "lit-element-router";
import '@kor-ui/kor/components/tag'
import '../../molecules/comment/comment';
// import { observeState } from 'lit-element-state';
// import { appState } from '../../../state/appState';
import { formatDistance } from 'date-fns'

type ItemType = {
  title: string,
  url: string,
  score: number,
  by: string,
  time: number,
  kids: string[]
}

@customElement('app-item-details')
// @observeState
@navigator
export class AppItemDetails extends (LitElement) {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    a {
        text-decoration: none;
    }
  `;
  itemId?: string;

  constructor() {
      super();

    //   appState.heading = 'ccc'
  }

  fetchStoryItem = () => {
    fetchItem(`https://hacker-news.firebaseio.com/v0/item/${this.itemId}.json`)
          .then((result: ItemType) => {
              this.item = result;
              this.update(new Map());
          })
  }

  // Declare reactive properties
  @property({ attribute: false })
  item?: ItemType;

  // Render the UI as a function of component state
  render() {
      if(!this.item && this.itemId) {
        this.fetchStoryItem()
      }
    return html`
        ${this.item && html`
            <a href=${this.item.url} target="_blank" ><kor-tag label="Title: ${this.item.title}"></kor-tag></a>
            <kor-tag label="Score: ${this.item.score}"></kor-tag>
            <kor-tag label="Username: ${this.item.by}"></kor-tag>
            <kor-tag label="Time: ${formatDistance(new Date(this.item.time*1000), new Date(), { addSuffix: true })}"></kor-tag>

            <app-comment .commentIds=${this.item.kids}></app-comment>
        `}
    `;
  }
}