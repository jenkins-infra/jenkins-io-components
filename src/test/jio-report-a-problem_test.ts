import {ReportAProblem} from '../jio-report-a-problem.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-report-a-problem', () => {
  test('Should show nothing by default', async () => {
    const el = (await fixture(html`<jio-report-a-problem></jio-report-a-problem>`)) as ReportAProblem;
    assert.instanceOf(el, ReportAProblem);
    assert.shadowDom.equal(el, ``);
  });
  test('Should show nothing by with just sourcePath ', async () => {
    const el = (await fixture(html`<jio-report-a-problem sourcePath="/sourcePath"></jio-report-a-problem>`)) as ReportAProblem;
    assert.instanceOf(el, ReportAProblem);
  });
  test('Should show nothing by with just githubRepo ', async () => {
    const el = (await fixture(html`<jio-report-a-problem githubRepo="/githubRepo"></jio-report-a-problem>`)) as ReportAProblem;
    assert.instanceOf(el, ReportAProblem);
  });
  test('Should everything with sourcePath and githubRepo', async () => {
    const el = (await fixture(html`<jio-report-a-problem sourcePath="source/path" githubRepo="github/repo"></jio-report-a-problem>`)) as ReportAProblem;
    assert.shadowDom.equal(
      el,
      `
      <a title="Report a problem with source/path">
        <ion-icon name="warning" class="report"></ion-icon>
        <span class="text">Report a problem</span>
      </a>
    `, {
      ignoreAttributes: ['href']
    });
  });
  test('with no title, it pulls from the document', async () => {
    document.title = 'document title';

    const el = (await fixture(html`<jio-report-a-problem sourcePath="source/path" githubRepo="github/repo"></jio-report-a-problem>`)) as ReportAProblem;
    assert.shadowDom.equal(
      el,
      `
      <a title="Report a problem with source/path">
        <ion-icon name="warning" class="report"></ion-icon>
        <span class="text">Report a problem</span>
      </a>
    `, {
      ignoreAttributes: ['href']
    });

    const href = el.shadowRoot?.querySelector('a')?.getAttribute('href') || '';
    const hrefURL = new URL(href);
    assert.match(href, /https:\/\/github.com\/github\/repo\/issues\/new/);
    assert.match(href, /title=document\+title\+page/);
    assert.match(href, /%28http%3A%2F%2Flocalhost(%3A\d+)?%2F/);
    assert.equal(hrefURL.searchParams.get('title') || '', 'document title page - TODO: Put a summary here');
    assert.deepEqual(hrefURL.searchParams.get('body')?.split('\n')?.filter(line => line.startsWith(' ')), []);
  });
  test('with no title, and no document title document, it uses url', async () => {
    document.title = '';
    const el = (await fixture(html`<jio-report-a-problem sourcePath="source/path" githubRepo="github/repo"></jio-report-a-problem>`)) as ReportAProblem;
    assert.shadowDom.equal(
      el,
      `
      <a title="Report a problem with source/path">
        <ion-icon name="warning" class="report"></ion-icon>
        <span class="text">Report a problem</span>
      </a>
    `, {
      ignoreAttributes: ['href']
    });
    const href = el.shadowRoot?.querySelector('a')?.getAttribute('href') || '';
    const hrefURL = new URL(href);

    assert.match(href, /https:\/\/github.com\/github\/repo\/issues\/new/);
    assert.match(href, /%28http%3A%2F%2Flocalhost(%3A\d+)?%2F/);
    assert.match(hrefURL.searchParams.get('title') || '', /http:\/\/localhost(:\d+)?\/.* page - TODO: Put a summary here/);
    assert.deepEqual(hrefURL.searchParams.get('body')?.split('\n')?.filter(line => line.startsWith(' ')), []);
  });

  test('with no url, it pulls from location', async () => {
    const el = (await fixture(html`<jio-report-a-problem sourcePath="source/path" githubRepo="github/repo" pageTitle="thingie"></jio-report-a-problem>`)) as ReportAProblem;
    assert.shadowDom.equal(
      el,
      `
      <a title="Report a problem with source/path">
        <ion-icon name="warning" class="report"></ion-icon>
        <span class="text">Report a problem</span>
      </a>
    `, {
      ignoreAttributes: ['href']
    });
    const href = el.shadowRoot?.querySelector('a')?.getAttribute('href') || '';
    const hrefURL = new URL(href);

    assert.match(href, /https:\/\/github.com\/github\/repo\/issues\/new/);
    assert.match(href, /%28http%3A%2F%2Flocalhost(%3A\d+)?%2F/);
    assert.equal(hrefURL.searchParams.get('title') || '', 'thingie page - TODO: Put a summary here');
    assert.deepEqual(hrefURL.searchParams.get('body')?.split('\n')?.filter(line => line.startsWith(' ')), []);
  });
  test('build correct body with all props provided it', async () => {
    document.title = 'document title';
    const el = (await fixture(html`<jio-report-a-problem sourcePath="source/path" githubRepo="github/repo" url="https://site.com/path/to/page"></jio-report-a-problem>`)) as ReportAProblem;
    assert.shadowDom.equal(
      el,
      `
      <a title="Report a problem with source/path">
        <ion-icon name="warning" class="report"></ion-icon>
        <span class="text">Report a problem</span>
      </a>
    `, {
      ignoreAttributes: ['href']
    });
    const href = el.shadowRoot?.querySelector('a')?.getAttribute('href') || '';
    const hrefURL = new URL(href);

    assert.match(href, /https:\/\/github.com\/github\/repo\/issues\/new/);
    assert.match(href, /title=document\+title\+page/);
    assert.match(href, /%28https%3A%2F%2Fsite.com%2Fpath%2Fto%2Fpage%29/);
    assert.equal(hrefURL.searchParams.get('title') || '', 'document title page - TODO: Put a summary here');
    assert.match(hrefURL.searchParams.get('body') || '', /https:\/\/site.com\/path\/to\/page/);
    assert.deepEqual(hrefURL.searchParams.get('body')?.split('\n')?.filter(line => line.startsWith(' ')), []);
  });
});

