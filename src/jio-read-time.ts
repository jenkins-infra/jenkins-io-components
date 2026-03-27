import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

function estimateReadTime(
  contentElement: HTMLElement | null,
  wordsPerMinute = 200
): String {
  if (!contentElement || !(contentElement instanceof HTMLElement)) {
    return "";
  }

  const text = contentElement.textContent
      ?.replace(/\s+/g, ' ') // ensure no extra white space 
      .trim() || '';

  if (!text) return "";

  const wordCount = text.split(' ').length;
  const min = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return min.toString() + " min read";
}

@customElement('jio-read-time-estimation')
export class ReadTimeEstimation extends LitElement {

  @property({ type: Object })
  content: HTMLElement | null = null;

  @property({ type: Number })
  wordsPerMinute = 200;

  override render() {
    const readTime = estimateReadTime(
      this.content,
      this.wordsPerMinute
    );

    return html`${readTime}`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'jio-read-time-estimation': ReadTimeEstimation;
  }
}
