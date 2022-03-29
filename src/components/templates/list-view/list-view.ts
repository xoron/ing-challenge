import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fetchStories, fetchItem } from "../../../api/utils";
import { navigator } from "lit-element-router";
import { formatDistance } from "date-fns";
// import { LionPagination } from '@lion/pagination';
// import '@lion/pagination/lion-pagination'; // this does not work with yarn

// customElements.define('lion-pagination', LionPagination);

import "@kor-ui/kor/components/table";
import "../../atoms/link/link";
import "../../molecules/pagination/pagination";

const capitalizeFirstLetter = (listName: String) => {
  return listName.charAt(0).toUpperCase() + listName.slice(1);
};

type StoryType = {
  title: string;
  url: string;
  id: number;
  by: string;
  score: number;
  time: number;
};

@customElement("app-list-view")
@navigator
export class AppListView extends LitElement {
  constructor() {
    super();
    this.page = "1";
    if (this.listName) this.fetchAllStories(this.listName);
    // window.addEventListener('current-changed', console.log)
  }

  fetchAllStories = (listName: string) => {
    this.requestedStories = true;
    fetchStories(
      `https://hacker-news.firebaseio.com/v0/${this.listName}stories.json`
    )
      .then((result: string[]) => {
        this.allNewStories = result;
        return this.fetchStoryDetails(parseInt(this.page));
      })
      .then((detailedResults: StoryType[]) => {
        this.stories = detailedResults;
        this.update(new Map());
      });
  };

  fetchStoryDetails = (currentPageNumber: number) => {
    const pageSize = 30;
    const storiesToFetch = this.allNewStories.slice(
      (currentPageNumber - 1) * pageSize,
      currentPageNumber * pageSize
    );

    return Promise.all(
      storiesToFetch.map((id) =>
        fetchItem(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
    );
  };

  goToPage = (newPageNumber: number) => {
    this.navigate(`/hn/${this.listName}?page=${newPageNumber}`);
    this.fetchStoryDetails(newPageNumber).then((detailedResults) => {
      this.stories = detailedResults;
      this.update(new Map());
    });
  };

  goToFirstPage = () => {
    this.goToPage(1);
  };

  goToLastPage = () => {
    this.goToPage(Math.ceil(this.allNewStories.length / 30));
  };

  goToNextPage = () => {
    if (parseInt(this.page) < Math.ceil(this.allNewStories.length / 30)) {
      this.goToPage(parseInt(this.page) + 1);
    }
  };

  goToPreviousPage = () => {
    this.goToPage(parseInt(this.page) - 1 || 1);
  };

  // Declare reactive properties
  @property({ type: Array })
  allNewStories: string[] = [];
  @property({ type: Array })
  stories: StoryType[] = [];
  @property({ type: Boolean })
  requestedStories: Boolean = false;

  // Render the UI as a function of component state
  render() {
    const currentPage = this.page;
    if (!this.requestedStories && this.listName)
      this.fetchAllStories(this.listName);

    return html`
      <h2>${capitalizeFirstLetter(this.listName)} stories</h2>

      <app-pagination
        .goToFirstPage=${this.goToFirstPage}
        .goToLastPage=${this.goToLastPage}
        .goToPreviousPage=${this.goToPreviousPage}
        .goToNextPage=${this.goToNextPage}
        .currentPage=${currentPage}
      ></app-pagination>

      ${this.stories.length
        ? html`<kor-table readonly>
              <kor-table-row slot="header">
                <kor-table-cell head grid-cols="12">Title</kor-table-cell>
                <kor-table-cell head grid-cols="2">score</kor-table-cell>
                <kor-table-cell head grid-cols="5">Username</kor-table-cell>
                <kor-table-cell head grid-cols="5">Created</kor-table-cell>
              </kor-table-row>

              ${this.stories.map((story) => {
                return html`
                  <kor-table-row>
                    <kor-table-cell grid-cols="12"
                      ><app-link target="_blank" href="/hn/item/${story.id}"
                        >${story.title}</app-link
                      ></kor-table-cell
                    >
                    <kor-table-cell grid-cols="2"
                      >${story.score}</kor-table-cell
                    >
                    <kor-table-cell grid-cols="5">${story.by}</kor-table-cell>
                    <kor-table-cell grid-cols="5"
                      >${formatDistance(
                        new Date(story.time * 1000),
                        new Date(),
                        { addSuffix: true }
                      )}</kor-table-cell
                    >
                  </kor-table-row>
                `;
              })}
            </kor-table>
            <!-- <lion-pagination @change=console.log count="20" current="10"></lion-pagination> -->
            <app-pagination
              .goToFirstPage=${this.goToFirstPage}
              .goToLastPage=${this.goToLastPage}
              .goToPreviousPage=${this.goToPreviousPage}
              .goToNextPage=${this.goToNextPage}
              .currentPage=${currentPage}
            ></app-pagination> `
        : "loading stories"}
    `;
  }
}
