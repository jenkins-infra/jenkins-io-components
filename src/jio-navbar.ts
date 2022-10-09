import {LitElement, html, unsafeCSS} from 'lit';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {customElement, state, property} from 'lit/decorators.js';

import './jio-cdf-logo.js';

import styles from './jio-navbar.scss';

type NavbarDropdownItem = {
  label: string;
  href: string;
  header?: boolean;
  title?: string;
};

@customElement('jio-navbar-dropdown')
export class NavbarDropdown extends LitElement {
  static override styles = unsafeCSS(styles);
  /**
   * Show search box
   */
  @property({type: Boolean})
  visible: Boolean = false;

  /**
   * Show search box
   */
  @property({type: Array})
  links: Array<NavbarDropdownItem> = [];

  override render() {
    return html`
      <li class="nav-item dropdown">
        <button
          @click=${this._toggleDropdown}
          aria-expanded="${this.visible ? "true" : "false"}"
          aria-haspopup="true" class="nav-link dropdown-toggle ${this.visible ? "show" : ""}"
        ><slot></slot></button>
        <div class="dropdown-menu ${this.visible ? "show" : ""}">
          ${this.links.map(link => {
      return html`<a class="dropdown-item feature" title=${ifDefined(link.title)} href="${link.href}">
              ${link.header ? html`<strong>${link.label}</strong>` : link.label}
            </a>`;
    })}
        </div>
      </li>
    `;
  }
  private _toggleDropdown(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('jio-toggle-menu', {
      bubbles: true,
      composed: true
    }));
  }


}
@customElement('jio-navbar')
export class Navbar extends LitElement {
  static override styles = unsafeCSS(styles);

  /**
   * Eg www.jenkins.io
   */
  @property()
  rootUrl: String = '';

  /**
   * Eg plugins.jenkins.io
   */
  @property()
  selfUrl: String = '';

  /**
   * Show search box
   */
  @property({type: Boolean})
  showSearchBox: Boolean = false;

  @state()
  visibleMenu = -1;

  @state()
  menuToggled = false;

  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick() {
    this.visibleMenu = -1;
  }

  override render() {
    const cdfMenuItems = [
      {label: "What is CDF?", href: "https://cd.foundation/"},
      {label: "Jenkins X", href: "https://jenkins-x.io/"},
      {label: "Tekton", href: "https://cloud.google.com/tekton/"},
      {label: "Spinnaker", href: "https://www.spinnaker.io/"},
    ];
    const menuItems = [
      ["Blog", "/node"],
      ["Documentation", [
        {
          label: "User Guide", href: "/doc/book", header: true
        },
        {label: "- Installing Jenkins", href: "/doc/book/installing/"}, // FIXME - nest again
        {label: "- Jenkins Pipeline", href: "/doc/book/pipeline/"},
        {label: "- Managing Jenkins", href: "/doc/book/managing/"},
        {label: "- Securing Jenkins", href: "/doc/book/security/"},
        {label: "- System Administration", href: "/doc/book/system - administration/"},
        {label: "- Troubleshooting Jenkins", href: "/doc/book/troubleshooting/"},
        {label: "- Terms and Definitions", href: "/doc/book/glossary/"},
        {label: "Solution Pages", href: "/solutions", header: true},
        {
          label: "Tutorials", href: "/doc/tutorials", header: true
        },
        {label: "- Guided Tour", href: "/doc/pipeline/tour/getting - started/"},
        {label: "- More Tutorials", href: "/doc/tutorials/"},
        {
          label: "Developer Guide", href: "/doc/developer", header: true
        },
        {label: "Contributor Guide", href: "/participate", header: true},
      ]],
      ["Plugins", "https://plugins.jenkins.io/"],
      ["Community", [
        {
          label: "Overview", href: "/participate/"
        },
        {
          label: "Chat", href: "/chat/", title: "Chat with the rest of the Jenkins community on IRC"
        },
        {label: "Meet", href: "/projects/jam/"},
        {
          label: "Events", href: "/events/"
        },
        {label: "Forum", href: "https://community.jenkins.io/"},
        {label: "Issue Tracker", href: "https://issues.jenkins.io/"},
        {label: "Mailing Lists", href: "/mailing-lists/", title: "Browse Jenkins mailing list archives and/ or subscribe to lists"},
        {label: "Roadmap", href: "/project/roadmap/"},
        {label: "Account Management", href: "https://accounts.jenkins.io/", title: "Create/manage your account for accessing wiki, issue tracker, etc"},
        {
          label: "Special Interest Groups", href: "/sigs/", header: true
        },
        {label: "- Advocacy and Outreach", href: "/sigs/advocacy - and - outreach/"},
        {label: "- Chinese Localization", href: "/sigs/chinese - localization/"},
        {label: "- Cloud Native", href: "/sigs/cloud - native/"},
        {label: "- Documentation", href: "/sigs/docs/"},
        {label: "- Google Summer of Code", href: "/sigs/gsoc/"},
        {label: "- Hardware and EDA", href: "/sigs/hw - and - eda/"},
        {label: "- Pipeline Authoring", href: "/sigs/pipeline - authoring/"},
        {label: "- Platform", href: "/sigs/platform/"},
        {label: "- User Experience", href: "/sigs/ux/"},
      ]],
      ["Subprojects", [
        {
          label: "Overview", href: "/projects/"
        },
        {label: "Google Summer of Code in Jenkins", href: "/projects/gsoc/"},
        {label: "Infrastructure", href: "/projects/infrastructure/"},
        {label: "CI/CD and Jenkins Area Meetups", href: "/projects/jam/"},
        {label: "Jenkins Configuration as Code", href: "/projects/jcasc/"},
        {label: "Jenkins Operator", href: "/projects/jenkins - operator/"},
        {label: "Jenkins Remoting", href: "/projects/remoting/"},
        {label: "Document Jenkins on Kubernetes", href: "/sigs/docs/gsod/2020/projects/document - jenkins - on - kubernetes/"},
      ]],
      ["About", [
        {label: "Roadmap", href: "/project/roadmap/"},
        {
          label: "Security", href: "/security/"
        },
        {
          label: "Press", href: "/press/"
        },
        {
          label: "Awards", href: "/awards/"
        },
        {label: "Conduct", href: "/project/conduct/"},
        {label: "Artwork", href: "/artwork/"},
      ]],
      ["English", [
        {label: "中文 Chinese", href: "/zh/"},
      ]]
    ] as Array<[string, string | Array<NavbarDropdownItem>]>;
    const menuItemsHtml = menuItems.map((topLevelMenuItem, idx) => {
      const [key, links] = topLevelMenuItem;
      let body;
      if (!links) {
        body = html`UNKNOWN-${key}-UNKNOWN`;
      } else if (Array.isArray(links)) {
        body = html`
          <jio-navbar-dropdown data-idx=${idx} .visible=${this.visibleMenu === idx} .links=${links} @jio-toggle-menu=${this._toggleDropdown}>
            ${key}
          </jio-navbar-dropdown>
        `;
      } else {
        body = html`<li class="nav-item"><a class="nav-link" href="${links}">${key}</a></li>`;
      }
      return body;
    });
    let searchboxHtml = html``;
    if (this.showSearchBox) {
      searchboxHtml = html`
      <li class="nav-item searchbox">
        <input class="form-control searchbox" type="search" placeholder="Search" aria-label="Search"></input>
      </li>
      `;
    }
    return html`
      <nav class="navbar">
        <a class="navbar-brand" href="/">Jenkins</a>
        <button class="navbar-toggler collapsed btn" type="button" @click=${this._clickCollapseButton}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <div class="collapse ${this.menuToggled ? "show" : ""}">
          <ul class="nav navbar-nav mr-auto">
            <jio-navbar-dropdown data-idx="15" .visible=${this.visibleMenu === 15} .links=${cdfMenuItems} @jio-toggle-menu=${this._toggleDropdown}>
              <jio-cdf-logo></jio-cdf-logo>
            </jio-navbar-dropdown>
          </ul>
          <ul class="nav navbar-nav ml-auto">
            ${menuItemsHtml}
            ${searchboxHtml}
            <li class="nav-item download-btn"><a class="nav-link btn btn-outline-secondary" href="/download/">Download</a>
          </ul>
        </div>
      </nav>
    `;
  }

  private _clickCollapseButton(e: Event) {
    e.preventDefault();
    this.menuToggled = !this.menuToggled;
  }

  private _toggleDropdown(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const dataset = (e.currentTarget as HTMLElement).dataset;
    if (this.visibleMenu === parseInt(dataset.idx || "-2", 10)) {
      this.visibleMenu = -1;
    } else {
      this.visibleMenu = parseInt(dataset.idx || "-1", 10);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-navbar': Navbar;
    'jio-navbar-dropdown': NavbarDropdown;
  }
}


