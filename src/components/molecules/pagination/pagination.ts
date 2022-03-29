import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@kor-ui/kor/components/button";

@customElement("app-pagination")
export class AppPagination extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      margin-bottom: 10px;
      justify-content: center;
    }

    kor-button {
      padding: 0 20px;
    }
  `;

  // Declare reactive properties
  @property()
  name?: string = "World";
  @property()
  goToFirstPage!: () => void;
  @property()
  goToPreviousPage!: () => void;
  @property()
  currentPage!: string;
  @property()
  goToNextPage!: () => void;
  @property()
  goToLastPage!: () => void;

  // Render the UI as a function of component state
  render() {
    return html`
      <kor-card slot="bottom" flex-direction="row" jus>
        <kor-button @click=${this.goToFirstPage}><<</kor-button>
        <kor-button @click=${this.goToPreviousPage}><</kor-button>
        <kor-button>${this.currentPage}</kor-button>
        <kor-button @click=${this.goToNextPage}>></kor-button>
        <kor-button @click=${this.goToLastPage}>>></kor-button>
      </kor-card>
    `;
  }
}
