import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles';

import outdent from 'outdent';

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

  override render() {
    if (!this.sourcePath || !this.githubRepo) {return null;}

    const _document = typeof document !== 'undefined' ? document : {title: 'Unknown'};
    const _location = typeof location !== 'undefined' ? location : {href: 'http://unknown'};
    const url = this.url || _location.href;
    const title = this.pageTitle || _document.title || url;


    const queryParams = new URLSearchParams();
    queryParams.append('labels', 'bug');
    queryParams.append('template', '4-bug.md');
    queryParams.append('title', `${title} page - TODO: Put a summary here`);
    queryParams.append('body', outdent`
        Problem with the [${title}](${url}) page,
        [source file](https://github.com/${this.githubRepo}/tree/master/src/${this.sourcePath})

        TODO: Describe the expected and actual behavior here

        # Screenshots

        TODO: Add screenshots if possible

        # Possible Solution

        <!-- If you have suggestions on a fix for the bug, please describe it here. -->

        N/A`);
    const pluginSiteReportUrl = `https://github.com/${this.githubRepo}/issues/new?${queryParams.toString()}`;
    return html`
      <a href=${pluginSiteReportUrl} title=${`Report a problem with ${this.sourcePath}`}>
        <ion-icon class="report" name="warning"></ion-icon>
        <span class="text">Report a problem</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-report-a-problem': ReportAProblem;
  }
}

