import { html, fixture, expect } from '@open-wc/testing';
import '../link';

describe('renders main app', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html` <app-link></app-link> `);
    
        await expect(el).shadowDom.to.be.accessible();
    });

    it ('clicking on link triggers navigation', () => {
        // add spy/mock for 'lit-element-router' navigator() decorator
        const el = await fixture(html`
            <app-link
                href="/some/route"
            ></app-link>
        `);

        el.shadowRoot.querySelector('a').click();

        // expect(mockedNavigateFunction).toBeCalledWith('/some/route')
    })
})