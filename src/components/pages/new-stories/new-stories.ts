import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { fetchStories, fetchItem } from '../../../api/utils';
import { navigator } from 'lit-element-router';

import '@kor-ui/kor/components/table'
import '../../atoms/link/link';

type StoryType = {
    title,
    url,
    id,
    by,
    score,
    time
}

@navigator
@customElement('app-new-stories')
export class AppNewStories extends LitElement {

    constructor(props) {
        super();
        fetchStories('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then(result => {
                this.allNewStories = result;
                return this.fetchStoryDetails(this.page);
            })
            .then(detailedResults => {
                this.stories = detailedResults;
                this.update();
            })
      }

      fetchStoryDetails = (currentPageNumber) => {
        const pageSize = 30;
        const storiesToFetch = this.allNewStories.slice((currentPageNumber - 1) * pageSize, currentPageNumber * pageSize)

        return Promise
            .all(
                storiesToFetch.map(id => fetchItem(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
            );
      }

//   // Define scoped styles right with your component, in plain CSS
//   static styles = css`
//     :host {
//       color: blue;
//     }
//   `;

  // Declare reactive properties
  @property({type: Array})
  allNewStories: number[] = [];
  @property({type: Array})
  stories: StoryType[] = [];
//   @property({attribute: false})
//   pageNumber: number = 0;
//   @property({attribute: false})
//   query: any = {};

//   router(route, params, query, data) {
//     this.query = query;
//     console.log('>>>>>>', route, params, query, data);
//   }

  // Render the UI as a function of component state
  render() {
    return html`
        <h2>New stories</h2>

        ${this.stories.length
            ? html`<kor-table readonly>
                    <kor-table-row slot="header">
                        <kor-table-cell head grid-cols="12">Title</kor-table-cell>
                        <kor-table-cell head grid-cols="6">score</kor-table-cell>
                        <kor-table-cell head grid-cols="3">Username</kor-table-cell>
                        <kor-table-cell head grid-cols="3">Created</kor-table-cell>
                    </kor-table-row>

                    ${this.stories.map(story => {
                        return html`
                            <kor-table-row>
                                <kor-table-cell grid-cols="12"><app-link href="/hn/item/${story.id}">${story.title}</kor-table-cell>
                                <kor-table-cell grid-cols="6">${story.score}</kor-table-cell>
                                <kor-table-cell grid-cols="3">${story.by}</kor-table-cell>
                                <kor-table-cell grid-cols="3">${story.time}</kor-table-cell>
                            </kor-table-row>
                        `
                    })}
                    <kor-table-row>
                        <kor-table-cell grid-cols="12">12 grid-cols</kor-table-cell>
                        <kor-table-cell grid-cols="6">6 grid-cols</kor-table-cell>
                        <kor-table-cell grid-cols="3">3 grid-cols</kor-table-cell>
                        <kor-table-cell grid-cols="3">3 grid-cols</kor-table-cell>
                    </kor-table-row>
                    <kor-table-row>
                        <kor-table-cell grid-cols="12">12 grid-cols</kor-table-cell>
                        <kor-table-cell grid-cols="6">6 grid-cols</kor-table-cell>
                        <kor-table-cell grid-cols="3">3 grid-cols</kor-table-cell>
                        <kor-table-cell grid-cols="3">3 grid-cols</kor-table-cell>
                    </kor-table-row>
                </kor-table>`
            : 'loading stories'
        }
        
    `;
  }
}