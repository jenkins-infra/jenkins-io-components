import {SocialMediaButtons} from '../jio-socialmedia-buttons.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-socialmedia-buttons', () => {
  suite('default variables', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-socialmedia-buttons></jio-socialmedia-buttons>`)) as SocialMediaButtons;
      assert.instanceOf(el, SocialMediaButtons);
      assert.shadowDom.equal(el, `<ul></ul>`);
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-socialmedia-buttons></jio-socialmedia-buttons>`)) as SocialMediaButtons;
      return assert.isAccessible(el);
    });
  });
  suite('all parameters', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-socialmedia-buttons github="halkeye" linkedin="halkeye" twitter="halkeye" blog='https://g4v.dev'></jio-socialmedia-buttons>`)) as SocialMediaButtons;
      assert.instanceOf(el, SocialMediaButtons);
      assert.shadowDom.equal(
        el,
        `<ul>
          <li><a href="https://github.com/halkeye" rel="noreferrer noopener" target="_blank"> Github </a></li>
          <li><a href="https://twitter.com/halkeye" rel="noreferrer noopener" target="_blank"> Twitter </a></li>
          <li><a href="https://g4v.dev" rel="noreferrer noopener" target="_blank"> Blog </a></li>
          <li><a href="https://www.linkedin.com/in/halkeye" rel="noreferrer noopener" target="_blank"> LinkedIn </a></li>
        </ul>`
      );
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-socialmedia-buttons github="halkeye" linkedin="halkeye" twitter="halkeye" blog='https://g4v.dev'></jio-socialmedia-buttons>`)) as SocialMediaButtons;
      return assert.isAccessible(el);
    });
  });
});

