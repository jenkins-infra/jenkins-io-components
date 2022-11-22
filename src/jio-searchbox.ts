import {LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docsearch: any;
  }
}

@customElement('jio-searchbox')
export class Searchbox extends LitElement {
  static override styles = css``;

  get isReady() {
    return this._isReady;
  }

  private _isReady = false;

  override connectedCallback() {
    super.connectedCallback();
    // have to add css to both the page (for popup) and webcomponent (button)
    [document.head, this.renderRoot].forEach(root => {
      const linkFileEl = document.createElement('link');
      linkFileEl.setAttribute('rel', 'stylesheet');
      linkFileEl.setAttribute('type', 'text/css');
      linkFileEl.setAttribute('href', `https://cdn.jsdelivr.net/npm/@docsearch/css@3`);
      linkFileEl.setAttribute('media', 'all');
      root.appendChild(linkFileEl);
    });
    import('@docsearch/js').then(({default: docsearch}) => {
      docsearch({
        container: this.renderRoot as HTMLElement,
        indexName: 'jenkins',
        appId: "M6L7Q4Z8HS",
        apiKey: "52f8dfbff76ffd9106f1c68fee16154b",
        searchParameters: {
          facetFilters: ["lang:en"],
        },
      });
      this._isReady = true;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-searchbox': Searchbox;
  }
}


