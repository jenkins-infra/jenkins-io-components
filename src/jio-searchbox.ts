import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ref, createRef} from 'lit/directives/ref.js';

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
    if (!window.docsearch) {
      // have to add css to both the page (for popup) and webcomponent (button)
      [document.head, this.renderRoot].forEach(root => {
        const linkFileEl = document.createElement('link');
        linkFileEl.setAttribute('rel', 'stylesheet');
        linkFileEl.setAttribute('type', 'text/css');
        linkFileEl.setAttribute('href', `https://cdn.jsdelivr.net/npm/@docsearch/css@3`);
        linkFileEl.setAttribute('media', 'all');
        root.appendChild(linkFileEl);
      });

      const scriptFileEl = document.createElement('script');
      scriptFileEl.setAttribute('defer', '');
      scriptFileEl.setAttribute('src', `https://cdn.jsdelivr.net/npm/@docsearch/js@3`);
      document.head.appendChild(scriptFileEl);
      scriptFileEl.addEventListener('load', this.onAlgoliaReady.bind(this));
    } else {
      setTimeout(this.onAlgoliaReady.bind(this), 0);
    }
  }

  private onAlgoliaReady() {
    window.docsearch({
      container: this.searchRef.value!,
      indexName: 'jenkins',
      appId: "M6L7Q4Z8HS",
      apiKey: "52f8dfbff76ffd9106f1c68fee16154b",
      searchParameters: {
        facetFilters: ["lang:en"],
      },
      debug: false
    });
    this._isReady = true;
  }

  private searchRef = createRef();

  override render() {
    return html`<div data-testid="searchbox"><div ${ref(this.searchRef)}></div></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-searchbox': Searchbox;
  }
}


