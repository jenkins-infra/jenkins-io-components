import {LitElement, TemplateResult, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './jio-socialmedia-buttons.css';

@customElement('jio-socialmedia-buttons')
export class SocialMediaButtons extends LitElement {
  static override styles = [styles];

  @property({type: String})
  twitter = "";

  @property({type: String})
  github = "";

  @property({type: String})
  blog = "";

  @property({type: String})
  linkedin = "";

  override render() {
    const _twitter: TemplateResult | symbol = !this.twitter ? nothing : html`<li><a href=${`https://twitter.com/${this.twitter}`} target="_blank" rel="noreferrer noopener">Twitter</a></li>`;
    const _github: TemplateResult | symbol = !this.github ? nothing : html`<li><a href=${`https://github.com/${this.github}`} target="_blank" rel="noreferrer noopener">Github</a></li>`;
    const _blog: TemplateResult | symbol = !this.blog ? nothing : html`<li><a href=${this.blog} target="_blank" rel="noreferrer noopener">Blog</a></li>`;
    const _linkedin: TemplateResult | symbol = !this.linkedin ? nothing : html`<li><a href=${`https://www.linkedin.com/in/${this.linkedin}`} target="_blank" rel="noreferrer noopener">LinkedIn</a></li>`;
    return html`
      <ul>
        ${_github}${_twitter}${_blog}${_linkedin}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-socialmedia-buttons': SocialMediaButtons;
  }
}
