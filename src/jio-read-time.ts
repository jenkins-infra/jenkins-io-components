import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

function estimateReadTime(
  contentElement: HTMLElement | null,
  wordsPerMinute = 200
): number {
  if (!contentElement || !(contentElement instanceof HTMLElement)) {
    return 1;
  }

  const text = contentElement.textContent
      ?.replace(/\s+/g, ' ') // ensure no extra white space 
      .trim() || '';

      
  if (!text) return 1;

  const wordCount = text.split(' ').length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

@customElement('jio-read-time-estimation')
export class ReadTimeEstimation extends LitElement {
  static override styles = css``;

  @property({ type: Object })
  content: HTMLElement | null = null;

  @property({ type: Number })
  wordsPerMinute = 200;

  override render() {
    const readTime = estimateReadTime(
      this.content,
      this.wordsPerMinute
    );

    return html`${readTime} min read`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'jio-read-time-estimation': ReadTimeEstimation;
  }
}
