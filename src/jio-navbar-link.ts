import {LitElement, html, css} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement, property} from 'lit/decorators.js';

import {NavbarItemLink} from './jio-navbar';
import './jio-cdf-logo';

@customElement('jio-navbar-link')
export class NavbarLink extends LitElement {
  static override styles = css`
.nav-link {
  color: rgba(255, 255, 255, 0.55);
  display: block;
  padding: 0.5em 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}
.dropdown-item {
  background-color: transparent;
  border: 0;
  clear: both;
  color: #212529;
  display: block;
  font-weight: 400;
  padding: 0.25em 1rem;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
}

.dropdown-item:focus,
.dropdown-item:hover {
  background-color: #cbd3da;
  color: #16181b;
  text-decoration: none;
}

.active {
	color: #fff;
	text-decoration: none;
	background-color: #007bff;
}


.dropdown-item.active,
.dropdown-item:active {
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
}

  `;

  @property()
  menuItem: NavbarItemLink | undefined;

  /**
   * Eg plugins.jenkins.io
   */
  @property()
  property = 'https://www.jenkins.io';

  @property()
  class = "";

  @property()
  locationHref = location.href;

  override render() {
    if (!this.menuItem) {return;}
    if (Array.isArray(this.menuItem.link)) {return;}
    let href = this.menuItem.link;

    const parsedMenuItem = new URL(this.menuItem.link, 'https://www.jenkins.io');
    const parsedPropertyUrl = new URL(this.property);
    let isActive = false;

    if (parsedPropertyUrl.host === parsedMenuItem.host) {
      // if its one of my properties, then its a relative link
      href = parsedMenuItem.toString().substring(parsedMenuItem.toString().split('/').slice(0, 3).join('/').length);
      if (this.locationHref && this.locationHref.startsWith(parsedMenuItem.pathname)) {
        isActive = true;
      }
    } else if (parsedPropertyUrl.host !== parsedMenuItem.host) {
      // if its a different property, then full url
      href = parsedMenuItem.toString();
    } else {
      throw new Error(this.menuItem.toString());
    }
    return html`<a class=${`nav-link ${this.class} ${isActive ? "active" : ""}`} title=${ifDefined(this.menuItem.title)} href=${href}>
        ${this.menuItem.header ? html`<strong>${this.menuItem.label}</strong>` : this.menuItem.label}
      </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-navbar-link': NavbarLink;
  }
}



