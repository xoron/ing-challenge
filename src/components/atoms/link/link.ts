import { LitElement, html, css } from "lit-element";
import { navigator } from "lit-element-router";
import { customElement } from 'lit/decorators';
import { ifDefined } from "lit/directives/if-defined";

@customElement('app-link')
@navigator
export class AppLink extends LitElement {
  // navigate?: (s: string) => void;
  href: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
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
      <a href="${this.href}" @click="${this.linkClick}" target="${ifDefined(this.target)}">
        <slot></slot>
      </a>
    `;
  }
  linkClick(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.navigate?.(this.href);
  }
}
