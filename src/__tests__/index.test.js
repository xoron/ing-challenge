import { html, fixture, expect } from "@open-wc/testing";
import "../index";

describe("renders main app", () => {
  it("passes the a11y audit", async () => {
    const el = await fixture(html` <app-main></app-main> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
