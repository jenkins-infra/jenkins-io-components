import {Navbar} from '../jio-navbar.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-navbar', () => {
  suite('default variables', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-navbar></jio-navbar>`)) as Navbar;
      assert.instanceOf(el, Navbar);
      // FIXME - Not sure what to test here.
      // Probably split things into a sub component,
      // so i can test the sub component,
      // and the main one has all the default menu items
      //
      // Maybe with slots for left and right blocks sections?
      //
      //
      // assert.shadowDom.equal(el, ``);
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-navbar></jio-navbar>`)) as Navbar;
      assert.instanceOf(el, Navbar);
      return assert.isAccessible(el);
    });
  });
});



