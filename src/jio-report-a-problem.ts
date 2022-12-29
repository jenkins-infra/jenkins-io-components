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

    const queryParams = new URLSearchParams();
    queryParams.append('labels', 'bug');
    queryParams.append('template', '4-bug.md');
    queryParams.append('title', `${title} page - TODO: Put a summary here`);
    queryParams.append('body', outdent`
        ${[
        `Problem with the [${title}](${url}) page`,
        sourcePath ?? `[source file](https://github.com/${githubRepo}/tree/${githubBranch}/src/${sourcePath})`
      ].filter(Boolean).join(', ')}

        TODO: Describe the expected and actual behavior here

        # Screenshots

        TODO: Add screenshots if possible

        # Possible Solution

        <!-- If you have suggestions on a fix for the bug, please describe it here. -->

        N/A`);
    const pluginSiteReportUrl = `https://github.com/${githubRepo}/issues/new?${queryParams.toString()}`;
    return html`
      <a href=${pluginSiteReportUrl} title=${msg(str`Report a problem with ${sourcePath || url}`)}>
        <ion-icon class="report" name="warning"></ion-icon>
        <span class="text">${msg('Report a problem')}</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-report-a-problem': ReportAProblem;
  }
}

