import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { fetchItem } from '../../../api/utils';
import { formatDistance, subDays } from 'date-fns'
import '@kor-ui/kor/components/accordion'
import { observeState } from 'lit-element-state';
import { appState } from '../../../state/appState';

@customElement('app-comment')
export class AppComment extends observeState(LitElement) {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
        margin-bottom: 10px;
    }
  `;

    fetchAllComments = () => {
        this.hasRequestedComments = true
        Promise.all(this.commentIds
                .map(itemId => fetchItem(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`))
            )
            .then(allComments => {
                this.comments = [...allComments];
                console.log({ allComments })
                this.update();
                console.log({ appState })
            })
    }

  // Declare reactive properties
  @property({ attribute: false })
  comments?: any = [];
//   @property({type: Boolean })
//   expanded: boolean = true;
  @property({type: Boolean })
  hasRequestedComments: boolean = false;

  // Render the UI as a function of component state
  render() {
      if (!this.hasRequestedComments && this.commentIds.length) {
        this.fetchAllComments();
      }

    return html`
        ${this.comments?.map(comment => {
            const label = `${comment.by} - ${formatDistance(new Date(comment.time*1000), new Date(), { addSuffix: true })}`
            return html`
                <kor-accordion label=${label} expanded>
                    <p>${comment.text}</p>

                    ${(comment.kids)
                        ? html`<app-comment .commentIds=${comment.kids}></app-comment>`
                        : ''
                    }
                </kor-accordion>
            `
        })}
  `}
}