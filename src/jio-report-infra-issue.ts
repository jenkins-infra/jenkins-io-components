import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles';
import {msg, str, localized} from '@lit/localize';

import outdent from 'outdent';

@localized()
@customElement('jio-report-infra-issue')
export class ReportInfraIssue extends LitElement {
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

  get derivedTitle() {
    return this.pageTitle || this.windowTitle;
  }

  get derivedUrl() {
    return this.url || this.locationHref;
  }

  get reportUrl() {
    const queryParams = new URLSearchParams();
    queryParams.append('labels', 'infra');
    queryParams.append('template', 'infra-issue.yml'); // Use a specific template for infra issues
    let problem = `[${this.derivedTitle}](${this.derivedUrl}) page`;
    if (this.sourcePath) {
      problem += `[source file](https://github.com/${this.githubRepo}/tree/${this.githubBranch}/${this.sourcePath})`;
    }
    queryParams.append('problem', problem);
    return `https://github.com/jenkins-infra/helpdesk/issues/new?${queryParams.toString()}`;
  }

  override render() {
    // Only render the link if githubRepo is provided
    if (!this.githubRepo) {
      return null;
    }

    return html`
      <a href=${this.reportUrl} title=${msg(str`Report an infrastructure issue related to ${this.sourcePath || this.derivedUrl}`)}>
        <ion-icon class="report" name="warning"></ion-icon>
        <span class="text">${msg('Report an Infra Issue')}</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-report-infra-issue': ReportInfraIssue;
  }
}
