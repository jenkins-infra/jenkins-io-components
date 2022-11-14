import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docsearch: any;
  }
}

@customElement('jio-searchbox')
export class Searchbox extends LitElement {
  static override styles = css`
    .form-control {
      display: block;
      width: 100%;
      height: calc(1.5em + .75rem + 2px);
      padding: .375rem .75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      outline-offset: -2px;
      -webkit-appearance: none;
    }

    .searchbox {
      box-sizing: border-box;
      display: inline-block;
      height: 32px !important;
      position: relative;
      visibility: visible !important;
      white-space: nowrap;
      width: 200px;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    const linkFileEl = document.createElement('link');
    linkFileEl.setAttribute('id', 'jio-searchbox-link');
    linkFileEl.setAttribute('rel', 'stylesheet');
    linkFileEl.setAttribute('type', 'text/css');
    linkFileEl.setAttribute('href', `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css`);
    linkFileEl.setAttribute('media', 'all');
    this.renderRoot.appendChild(linkFileEl);

    const scriptFileEl = document.createElement('script');
    scriptFileEl.setAttribute('defer', '');
    scriptFileEl.setAttribute('id', 'jio-searchbox-script');
    scriptFileEl.setAttribute('src', `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js`);
    document.head.appendChild(scriptFileEl);
    scriptFileEl.addEventListener('load', () => {

      // override getInputFromSelector to use the shadowroot functionality
      window.docsearch.prototype.constructor.getInputFromSelector = () => {
        return this.renderRoot.querySelector('input.searchbox');
      };

      // override handleShown to support shaddowroot
      window.docsearch.prototype.constructor.prototype.handleShown = (input: HTMLElement) => {
        const middleOfInput = input.getBoundingClientRect().x + (input.offsetWidth / 2);
        let middleOfWindow = (document.querySelector('body')?.clientWidth || 900) / 2;

        if (isNaN(middleOfWindow)) {
          middleOfWindow = 900;
        }

        const alignClass = middleOfInput - middleOfWindow >= 0 ? 'algolia-autocomplete-right' : 'algolia-autocomplete-left';
        const autocompleteWrapper = this.renderRoot.querySelector('.algolia-autocomplete');
        autocompleteWrapper?.classList?.remove('algolia-autocomplete-right', 'algolia-autocomplete-left');
        autocompleteWrapper?.classList?.add(alignClass);

        this.dispatchEvent(new CustomEvent('jio-searchbox:shown', {bubbles: true, composed: true}));
      };

      /*
       * Ready for v3 when we get access
       * scriptFileEl.setAttribute('src', `https://cdn.jsdelivr.net/npm/@docsearch/js@3`);
       * linkFileEl.setAttribute('href', `https://cdn.jsdelivr.net/npm/@docsearch/css@3`);
       * container: this.renderRoot
       */

      window.docsearch({
        apiKey: '9df657b854f8c42d9887b34bc275db4d',
        indexName: 'jenkins',
        inputSelector: '*',
        algoliaOptions: {'facetFilters': ["tags:en"]},
        debug: true
      });

      this.dispatchEvent(new CustomEvent('jio-searchbox:ready', {bubbles: true, composed: true}));
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.querySelector('#jio-searchbox-script')?.remove();
  }

  override render() {
    return html`<input data-testid="searchbox" class="form-control searchbox" type="search" placeholder="Search" aria-label="Search" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-searchbox': Searchbox;
  }
}


