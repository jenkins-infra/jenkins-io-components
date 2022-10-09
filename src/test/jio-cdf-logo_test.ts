import {CDFLogo} from '../jio-cdf-logo.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-cdf-logo', () => {
  test('shows sunny by default', async () => {
    const el = (await fixture(html`<jio-cdf-logo></jio-cdf-logo>`)) as CDFLogo;
    assert.instanceOf(el, CDFLogo);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
    assert.equal(el.shadowRoot?.querySelector('svg title')?.textContent, "CDF");
    assert.isAccessible(el);
  });
});



