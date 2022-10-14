import {NavbarLink} from '../jio-navbar-link.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-navbar-link', () => {
  suite('default variables', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-navbar-link></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, ``);
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-navbar-link></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      return assert.isAccessible(el);
    });
  });
  suite('populated variablse', async () => {
    test('is accessible', async () => {
      const menuItem = {label: "someLabel", link: "/path/to"};
      const property = "https://webcomponents.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                .menuItem=${menuItem}
                                .property=${property}></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      return assert.isAccessible(el);
    });
    test('relative link with non matching property should render full url', async () => {
      const menuItem = {label: "someLabel", link: "/path/to"};
      const property = "https://webcomponents.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                .menuItem=${menuItem}
                                .property=${property}></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="https://www.jenkins.io/path/to">someLabel</a>`);
    });
    test('relative link with matching property should render full url', async () => {
      const menuItem = {label: "someLabel", link: "/path/to"};
      const property = "https://www.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                .menuItem=${menuItem}
                                .property=${property}></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="/path/to">someLabel</a>`);
    });
    test('absolute link with non matching property should render full url', async () => {
      const menuItem = {label: "someLabel", link: "https://plugins.jenkins.io/path/to"};
      const property = "https://webcomponents.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                .menuItem=${menuItem}
                                .property=${property}></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="https://plugins.jenkins.io/path/to">someLabel</a>`);
    });
    test('absolute link with matching property should render full url', async () => {
      const menuItem = {label: "someLabel", link: "https://plugins.jenkins.io/path/to"};
      const property = "https://plugins.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                .menuItem=${menuItem}
                                .property=${property}></jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="/path/to">someLabel</a>`);
    });
  });
});




