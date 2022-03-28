import { LitElement, html, css } from "lit-element";
import { navigator } from "lit-element-router";

@navigator
export class AppLink extends LitElement {
  static get properties() {
    return {
      href: { type: String },
      target: { type: String }
    };
  }
  static get styles() {
    return css`
      a {
          text-decoration: none;
        margin: 5px;
      }
    `;
  }
  constructor() {
    super();
    this.href = "";
  }
  render() {
    return html`
      <a href="${this.href}" @click="${this.linkClick}" target="${this.target}">
        <slot></slot>
      </a>
    `;
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

customElements.define("app-link", AppLink);
