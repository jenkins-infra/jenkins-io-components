import {Footer} from '../jio-footer.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-footer', () => {
  suite('default variables', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-footer></jio-footer>`)) as Footer;
      assert.instanceOf(el, Footer);
      assert.shadowDom.notEqual(el, ``);
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-footer></jio-footer>`)) as Footer;
      assert.instanceOf(el, Footer);
      return assert.isAccessible(el);
    });
  });
});




