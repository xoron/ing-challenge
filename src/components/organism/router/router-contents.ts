import { LitElement, html } from 'lit-element';
import { customElement } from 'lit/decorators';
import { outlet } from 'lit-element-router';
 
@customElement('app-router-contents')
@outlet
export class AppRouterContents extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}