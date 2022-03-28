import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { fetchStories, fetchItem } from '../../../api/utils';
import { navigator } from 'lit-element-router';
import { formatDistance } from 'date-fns'
// import { LionPagination } from '@lion/pagination';
// import '@lion/pagination/lion-pagination'; // this does not work with yarn

// customElements.define('lion-pagination', LionPagination);

import '@kor-ui/kor/components/table'
import '../../atoms/link/link';
import '../../molecules/pagination/pagination';

type StoryType = {
    title,
    url,
    id,
    by,
    score,
    time
}

@customElement('app-new-stories')
@navigator
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
        
        window.addEventListener('current-changed', console.log)
      }

      fetchStoryDetails = (currentPageNumber) => {
        const pageSize = 30;
        const storiesToFetch = this.allNewStories.slice((currentPageNumber - 1) * pageSize, currentPageNumber * pageSize)

        return Promise
            .all(
                storiesToFetch.map(id => fetchItem(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
            );
      }

      goToPage = (newPageNumber) => {
        this.navigate(`/hn/new?page=${newPageNumber}`)
        this.fetchStoryDetails(newPageNumber)
            .then(detailedResults => {
                this.stories = detailedResults;
                this.update();
            })
      }

      goToFirstPage = () => {
          this.goToPage(1);
      }

      goToLastPage = () => {
          this.goToPage(Math.ceil(this.allNewStories.length / 30));
      }

      goToNextPage = () => {
          if (parseInt(this.page) < Math.ceil(this.allNewStories.length / 30)) {
              this.goToPage(parseInt(this.page)+1);
          }
      }

      goToPreviousPage = () => {
          this.goToPage((parseInt(this.page)-1) || 1);
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
    const currentPage = this.page;
    return html`
        <h2>New stories</h2>

        ${this.stories.length
            ? html`<kor-table readonly>
                    <kor-table-row slot="header">
                        <kor-table-cell head grid-cols="12">Title</kor-table-cell>
                        <kor-table-cell head grid-cols="2">score</kor-table-cell>
                        <kor-table-cell head grid-cols="5">Username</kor-table-cell>
                        <kor-table-cell head grid-cols="5">Created</kor-table-cell>
                    </kor-table-row>

                    ${this.stories.map(story => {
                        return html`
                            <kor-table-row>
                                <kor-table-cell grid-cols="12"><app-link target="_blank" href="/hn/item/${story.id}">${story.title}</app-link></kor-table-cell>
                                <kor-table-cell grid-cols="2">${story.score}</kor-table-cell>
                                <kor-table-cell grid-cols="5">${story.by}</kor-table-cell>
                                <kor-table-cell grid-cols="5">${formatDistance(new Date(story.time*1000), new Date(), { addSuffix: true })}</kor-table-cell>
                            </kor-table-row>
                        `
                    })}
                </kor-table>
                <!-- <lion-pagination @change=console.log count="20" current="10"></lion-pagination> -->
                <app-pagination
                    .goToFirstPage=${this.goToFirstPage}
                    .goToLastPage=${this.goToLastPage}
                    .goToPreviousPage=${this.goToPreviousPage}
                    .goToNextPage=${this.goToNextPage}
                    .currentPage=${currentPage}
                ></app-pagination>
                `
            : 'loading stories'
        }
        
    `;
  }
}