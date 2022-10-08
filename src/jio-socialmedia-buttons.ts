import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './jio-socialmedia-buttons.scss';

@customElement('jio-socialmedia-buttons')
export class SocialMediaButtons extends LitElement {
  static override styles = unsafeCSS(styles);

  @property({type: String})
  twitter = "";

  @property({type: String})
  github = "";

  @property({type: String})
  blog = "";

  @property({type: String})
  linkedin = "";

  override render() {
    let twitter = html``;
    if (this.twitter) {
      twitter = html`<li><a href=${`https://twitter.com/${this.twitter}`} target="_blank" rel="noreferrer noopener">Twitter</a></li>`;
    }
    let github = html``;
    if (this.github) {
      github = html`<li><a href=${`https://github.com/${this.github}`} target="_blank" rel="noreferrer noopener">Github</a></li>`;
    }
    let blog = html``;
    if (this.blog) {
      blog = html`<li><a href=${this.blog} target="_blank" rel="noreferrer noopener">Blog</a></li>`;
    }
    let linkedin = html``;
    if (this.linkedin) {
      linkedin = html`<li><a href=${`https://www.linkedin.com/in/${this.linkedin}`} target="_blank" rel="noreferrer noopener">LinkedIn</a></li>`;
    }
    return html`
      <ul>
        ${github}${twitter}${blog}${linkedin}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-socialmedia-buttons': SocialMediaButtons;
  }
}
