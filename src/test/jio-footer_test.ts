import {Footer} from '../jio-footer.js';
import {ImproveThisPage} from '../jio-improve-this-page.js';
import {ReportAProblem} from '../jio-report-a-problem.js';

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
  test('properties', async () => {
    const el = (await fixture(html`<jio-footer githubBranch="master" githubRepo="jenkins-infra/jenkins.io" property="https://www.jenkins.io" sourcePath="index.html.haml"></jio-footer>`)) as Footer;
    assert.instanceOf(el, Footer);
    assert.shadowDom.notEqual(el, ``);

    assert.equal(el.githubBranch, 'master');
    const improveThisPage = el.shadowRoot?.querySelector('jio-improve-this-page') as ImproveThisPage;
    assert.equal(improveThisPage.githubBranch, 'master');
    assert.equal(improveThisPage.githubRepo, 'jenkins-infra/jenkins.io');
    assert.equal(improveThisPage.sourcePath, 'index.html.haml');

    const reportAProblem = el.shadowRoot?.querySelector('jio-report-a-problem') as ReportAProblem;
    assert.equal(reportAProblem.githubBranch, 'master');
    assert.equal(reportAProblem.githubRepo, 'jenkins-infra/jenkins.io');
    assert.equal(reportAProblem.sourcePath, 'index.html.haml');
  });
});
