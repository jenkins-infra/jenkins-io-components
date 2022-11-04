import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles';

@customElement('jio-improve-this-page')
export class ImproveThisPage extends LitElement {
  static override styles = [
    ionIconText,
    css`
      ion-icon { color: black; }
    `
  ];

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
  githubBranch = 'main';

  override render() {
    if (!this.sourcePath) {return null;}
    if (!this.githubRepo) {return null;}

    return html`
    <a href=${`https://github.com/${this.githubRepo}/edit/${this.githubBranch}/${this.sourcePath}`} title=${`Edit ${this.sourcePath} on GitHub`}>
      <ion-icon name="logo-github"></ion-icon>
      <span class="text">Improve this page</span>
     </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-improve-this-page': ImproveThisPage;
  }
}
