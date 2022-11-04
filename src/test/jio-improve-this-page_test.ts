import {ImproveThisPage} from '../jio-improve-this-page.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-improve-this-page', () => {
  test('Should show nothing by default', async () => {
    const el = (await fixture(html`<jio-improve-this-page></jio-improve-this-page>`)) as ImproveThisPage;
    assert.instanceOf(el, ImproveThisPage);
    assert.shadowDom.equal(el, ``);
  });
  test('Should show nothing by with just sourcePath ', async () => {
    const el = (await fixture(html`<jio-improve-this-page sourcePath="/sourcePath"></jio-improve-this-page>`)) as ImproveThisPage;
    assert.instanceOf(el, ImproveThisPage);
  });
  test('Should show nothing by with just githubRepo ', async () => {
    const el = (await fixture(html`<jio-improve-this-page githubRepo="/githubRepo"></jio-improve-this-page>`)) as ImproveThisPage;
    assert.instanceOf(el, ImproveThisPage);
  });
  test('Should everything with sourcePath and githubRepo', async () => {
    const el = (await fixture(html`<jio-improve-this-page sourcePath="source/path" githubRepo="github/repo"></jio-improve-this-page>`)) as ImproveThisPage;
    assert.shadowDom.equal(
      el,
      `
      <a
        href="https://github.com/github/repo/edit/main/source/path"
        title="Edit source/path on GitHub"
      >
        <ion-icon name="logo-github"></ion-icon>
        <span class="text">Improve this page</span>
      </a>
    `
    );
  });
  test('Should everything with sourcePath, githubRepo, and githubBranch', async () => {
    const el = (await fixture(html`<jio-improve-this-page sourcePath="source/path" githubBranch='boobar' githubRepo="github/repo"></jio-improve-this-page>`)) as ImproveThisPage;
    assert.shadowDom.equal(
      el,
      `
      <a
        href="https://github.com/github/repo/edit/boobar/source/path"
        title="Edit source/path on GitHub"
      >
        <ion-icon name="logo-github"></ion-icon>
        <span class="text">Improve this page</span>
      </a>
    `
    );
  });
});

