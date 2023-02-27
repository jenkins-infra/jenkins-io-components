import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles';
import {msg, str, localized} from '@lit/localize';

import outdent from 'outdent';

@localized()
@customElement('jio-report-a-problem')
export class ReportAProblem extends LitElement {
  static override styles = [
    ionIconText,
    css`
      ion-icon { color: #FFA91B; }
    `
  ];

  /**
   * Overrides the page title. Defaults to page title
   */
  @property()
  pageTitle = '';

  /**
   * Overrides the page title. Defaults to page url
   */
  @property()
  url = '';

  /**
   * Github source path relative to $githubRepo
   */
  @property()
  sourcePath = '';

  /**
   * Github repo
   */
  @property()
  githubRepo = '';

  /**
   * Github branch
   */
  @property()
  githubBranch = 'master';

  /**
   * The name of the bug report template to use
   */
  @property({ type: String })
  template = '';

  get locationHref() {
    const _location = typeof location !== 'undefined' ? location : {href: 'http://unknown'};
    return _location.href;
  }

  get windowTitle() {
    const _document = typeof document !== 'undefined' ? document : {title: 'Unknown'};
    return _document.title;
  }

  override render() {
    if (!this.githubRepo) {return null;}

    const githubBranch = this.githubBranch;
    const githubRepo = this.githubRepo;
    const sourcePath = this.sourcePath;

    const url = this.url || this.locationHref;
    const title = this.pageTitle || this.windowTitle;

    if (this.template != null) {

      const queryParams = new URLSearchParams();
      queryParams.append('labels', 'bug');
      queryParams.append('template', '4-bug.yml');
      queryParams.append('problem', outdent`
        ${[
        `[${title}](${url}) page`,
        sourcePath ?? `[source file](https://github.com/${githubRepo}/tree/${githubBranch}/src/${sourcePath})`
      ].filter(Boolean).join(', ')}`);
      const pluginSiteReportUrl = `https://github.com/${githubRepo}/issues/new?${queryParams.toString()}`;
      return html`
        <a href=${pluginSiteReportUrl} title=${msg(str`Report a problem with ${sourcePath || url}`)}>
          <ion-icon class="report" name="warning"></ion-icon>
          <span class="text">${msg('Report a problem')}</span>
        </a>
      `;
    } else {
      return null;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-report-a-problem': ReportAProblem;
  }
}
