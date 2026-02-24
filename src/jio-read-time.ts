import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

function estimateReadTime(paragraphs: Array<string | {html?: string}> = [], wordsPerMinute = 200): number {
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
    return 1;
  }

  const fullText = paragraphs
    .map(p => (typeof p === 'string' ? p : p.html || ''))
    .join(' ');

  const cleanedText = fullText
    .replace(/<[^>]*>/g, ' ') // remove HTML tags
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // remove markdown links
    .replace(/https?:\/\/\S+/g, '') // remove raw URLs
    .replace(/[`*_>#-]/g, '') // remove markdown symbols
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanedText) return 1;

  const words = cleanedText.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return minutes;
}

@customElement('jio-read-time-estimation')
export class ReadTimeEstimation extends LitElement {
  static override styles = css``;

  @property({type: Array})
  paragraphs: Array<string | {html?: string}> = [];

  @property({type: Number})
  wordsPerMinute = 200;

  override render() {
    const readTime = estimateReadTime(this.paragraphs, this.wordsPerMinute);
    return html`${readTime} min read`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-read-time-estimation': ReadTimeEstimation;
  }
}
