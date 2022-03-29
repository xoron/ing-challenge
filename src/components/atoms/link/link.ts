import { LitElement, html, css } from "lit-element";
import { navigator } from "lit-element-router";
import { customElement } from "lit/decorators";

@customElement("app-link")
@navigator
export class AppLink extends LitElement {
  static get properties() {
    return {
      href: { type: String },
      target: { type: String },
    };
  }
  static get styles() {
    return css`
      a {
        text-decoration: none;
        margin: 5px;
        cursor: pointer;
      }
    `;
  }
  constructor() {
    super();
    // this.href = "";
  }
  render() {
    const href = this.href;
    const target = this.target;

    return html`
      <a
        @click=${this.linkClick}
        target=${target}
        href=${href}
      >
        <slot></slot>
      </a>
    `;
  }
  linkClick(event: { preventDefault: () => void }) {

    if (!this.target || (this.target !== '_blank')) {
      event.preventDefault();
      this.navigate(this.href);
    } else {
      window.open(this.href)
    }
  }
}
