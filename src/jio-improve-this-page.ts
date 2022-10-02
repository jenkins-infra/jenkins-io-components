import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles.js';

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

  override render() {
    if (!this.sourcePath) {return null;}
    if (!this.githubRepo) {return null;}

    return html`
    <a href=${`https://github.com/${this.githubRepo}/edit/main/${this.sourcePath}`} title=${`Edit ${this.sourcePath} on GitHub`}>
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
