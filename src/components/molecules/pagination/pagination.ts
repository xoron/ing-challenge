import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@kor-ui/kor/components/button'

@customElement('app-pagination')
export class AppPagination extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      margin-bottom: 10px;
    }
  `;

  // Declare reactive properties
  @property()
  name?: string = 'World';
  goToFirstPage!: () => void;
  goToPreviousPage!: () => void;
  currentPage!: string;
  goToNextPage!: () => void;
  goToLastPage!: () => void;

  // Render the UI as a function of component state
  render() {
    return html`
      <kor-card slot="bottom" flex-direction="row">
          <kor-button @click=${this.goToFirstPage}><<</kor-button>
          <kor-button @click=${this.goToPreviousPage}><</kor-button>
          <kor-button>${this.currentPage}</kor-button>
          <kor-button @click=${this.goToNextPage}>></kor-button>
          <kor-button @click=${this.goToLastPage}>>></kor-button>
      </kor-card>
    `;
  }
}