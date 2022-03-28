import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./components/organism/router/router";

@customElement("app-main")
export class AppMain extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  //   static styles = css`
  //     :host {
  //       color: blue;
  //     }
  //   `;

  // Render the UI as a function of component state
  render() {
    return html` <app-router></app-router> `;
  }
}
