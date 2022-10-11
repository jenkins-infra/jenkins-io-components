import {LitElement, html, TemplateResult} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement, state, property} from 'lit/decorators.js';

import './jio-cdf-logo';

import styles from './jio-navbar.css';

type NavbarItemLink = {
  label: TemplateResult | string;
  link: string | Array<NavbarItemLink>;
  header?: boolean;
  title?: string;
};

@customElement('jio-navbar')
export class Navbar extends LitElement {
  static override styles = [styles];

  /**
   * Eg plugins.jenkins.io
   */
  @property()
  property = 'https://www.jenkins.io';

  /**
   * Show search box
   * (doesnt yet work)
   */
  @property({type: Boolean})
  showSearchBox: Boolean = false;

  /**
   * Keeps track of what menu is opened. 
   *
   * Never to be set externally, though storybook shows it.
   * @private
   */
  @state()
  private visibleMenu = -1;

  /**
   * Keeps track if the collapsed (mobile) menu is shown or not
   *
   * Never to be set externally, though storybook shows it.
   * @private
   */
  @state()
  private menuToggled = false;

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
      {label: "What is CDF?", link: "https://cd.foundation/"},
      {label: "Jenkins X", link: "https://jenkins-x.io/"},
      {label: "Tekton", link: "https://cloud.google.com/tekton/"},
      {label: "Spinnaker", link: "https://www.spinnaker.io/"},
    ];
    const menuItems = [
      {label: "Blog", link: "/node"},
      {
        label: "Documentation", link: [
          {
            label: "User Guide", link: "/doc/book", header: true
          },
          {label: "- Installing Jenkins", link: "/doc/book/installing/"}, // FIXME - nest again
          {label: "- Jenkins Pipeline", link: "/doc/book/pipeline/"},
          {label: "- Managing Jenkins", link: "/doc/book/managing/"},
          {label: "- Securing Jenkins", link: "/doc/book/security/"},
          {label: "- System Administration", link: "/doc/book/system - administration/"},
          {label: "- Troubleshooting Jenkins", link: "/doc/book/troubleshooting/"},
          {label: "- Terms and Definitions", link: "/doc/book/glossary/"},
          {label: "Solution Pages", link: "/solutions", header: true},
          {
            label: "Tutorials", link: "/doc/tutorials", header: true
          },
          {label: "- Guided Tour", link: "/doc/pipeline/tour/getting - started/"},
          {label: "- More Tutorials", link: "/doc/tutorials/"},
          {
            label: "Developer Guide", link: "/doc/developer", header: true
          },
          {label: "Contributor Guide", link: "/participate", header: true},
        ]
      },
      {label: "Plugins", link: "https://plugins.jenkins.io/"},
      {
        label: "Community", link: [
          {
            label: "Overview", link: "/participate/"
          },
          {
            label: "Chat", link: "/chat/", title: "Chat with the rest of the Jenkins community on IRC"
          },
          {label: "Meet", link: "/projects/jam/"},
          {
            label: "Events", link: "/events/"
          },
          {label: "Forum", link: "https://community.jenkins.io/"},
          {label: "Issue Tracker", link: "https://issues.jenkins.io/"},
          {label: "Mailing Lists", link: "/mailing-lists/", title: "Browse Jenkins mailing list archives and/ or subscribe to lists"},
          {label: "Roadmap", link: "/project/roadmap/"},
          {label: "Account Management", link: "https://accounts.jenkins.io/", title: "Create/manage your account for accessing wiki, issue tracker, etc"},
          {
            label: "Special Interest Groups", link: "/sigs/", header: true
          },
          {label: "- Advocacy and Outreach", link: "/sigs/advocacy - and - outreach/"},
          {label: "- Chinese Localization", link: "/sigs/chinese - localization/"},
          {label: "- Cloud Native", link: "/sigs/cloud - native/"},
          {label: "- Documentation", link: "/sigs/docs/"},
          {label: "- Google Summer of Code", link: "/sigs/gsoc/"},
          {label: "- Hardware and EDA", link: "/sigs/hw - and - eda/"},
          {label: "- Pipeline Authoring", link: "/sigs/pipeline - authoring/"},
          {label: "- Platform", link: "/sigs/platform/"},
          {label: "- User Experience", link: "/sigs/ux/"},
        ]
      },
      {
        label: "Subprojects", link: [
          {
            label: "Overview", link: "/projects/"
          },
          {label: "Google Summer of Code in Jenkins", link: "/projects/gsoc/"},
          {label: "Infrastructure", link: "/projects/infrastructure/"},
          {label: "CI/CD and Jenkins Area Meetups", link: "/projects/jam/"},
          {label: "Jenkins Configuration as Code", link: "/projects/jcasc/"},
          {label: "Jenkins Operator", link: "/projects/jenkins - operator/"},
          {label: "Jenkins Remoting", link: "/projects/remoting/"},
          {label: "Document Jenkins on Kubernetes", link: "/sigs/docs/gsod/2020/projects/document - jenkins - on - kubernetes/"},
        ]
      },
      {
        label: "About", link: [
          {label: "Roadmap", link: "/project/roadmap/"},
          {
            label: "Security", link: "/security/"
          },
          {
            label: "Press", link: "/press/"
          },
          {
            label: "Awards", link: "/awards/"
          },
          {label: "Conduct", link: "/project/conduct/"},
          {label: "Artwork", link: "/artwork/"},
        ]
      },
      {
        label: "English", link: [
          {label: "中文 Chinese", link: "/zh/"},
        ]
      }
    ] as Array<NavbarItemLink>;
    const menuItemsHtml = menuItems.map((menuItem, idx) => {
      let body;
      if (menuItem.link && Array.isArray(menuItem.link)) {
        body = this.renderNavItemDropdown(menuItem, idx, this.visibleMenu === idx);
      } else {
        body = html`<li class="nav-item">${this.renderNavItemLink(menuItem)}</li>`;
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
        <a class="navbar-brand" href="https://www.jenkins.io">Jenkins</a>
        <button class="navbar-toggler collapsed btn" type="button" @click=${this._clickCollapseButton}>
          <ion-icon name="menu-outline" title="Toggle Menu Visible"></ion-icon>
        </button>
        <div class="collapse ${this.menuToggled ? "show" : ""}">
          <ul class="nav navbar-nav mr-auto">
            ${this.renderNavItemDropdown({label: html`<jio-cdf-logo></jio-cdf-logo>`, link: cdfMenuItems}, 99, this.visibleMenu === 99)}
          </ul>
          <ul class="nav navbar-nav ml-auto">
            ${menuItemsHtml}
            ${searchboxHtml}
            <li class="nav-item download-btn">
              ${this.renderNavItemLink({link: '/download/', label: 'Download', }, ['btn btn-outline-secondary'])}
            </li>
          </ul>
        </div>
      </nav>
    `;
  }

  renderNavItemDropdown(menuItem: NavbarItemLink, idx: number, visible: Boolean) {
    if (!Array.isArray(menuItem.link)) {
      return this.renderNavItemLink(menuItem);
    }
    const linksHtml = menuItem.link.map(menuItem => this.renderNavItemLink(menuItem, ['dropdown-item feature']));
    return html`
      <li class="nav-item dropdown">
        <button
          @click=${this._toggleDropdown}
          data-idx=${idx}
          aria-expanded=${visible ? "true" : "false"}
          aria-haspopup="true"
          class="nav-link dropdown-toggle ${visible ? "show" : ""}"
        >${menuItem.label}</button>
        <div class="dropdown-menu ${visible ? "show" : ""}">
          ${linksHtml}
        </div>
      </li>
    `;
  }

  renderNavItemLink(menuItem: NavbarItemLink, extraClasses: Array<string> = []) {
    if (Array.isArray(menuItem.link)) {
      throw new Error('dropdown passed into render item');
      return null;
    }

    const parsedMenuItem = new URL(menuItem.link, 'https://www.jenkins.io');
    const parsedPropertyUrl = new URL(menuItem.link, this.property);
    let href = menuItem.link;
    // if the property is not the same as the url (eg /downloads), then full link
    if (parsedPropertyUrl.host !== parsedMenuItem.host) {
      href = parsedMenuItem.toString();
    } else {
      href = parsedMenuItem.toString().substring(parsedMenuItem.toString().split('/').slice(0, 3).join('/').length);
    }
    return html`<a
      class=${['nav-link'].concat(extraClasses).join(' ')}
      title=${ifDefined(menuItem.title)}
      href=${href}>
        ${menuItem.header ? html`<strong>${menuItem.label}</strong>` : menuItem.label}
      </a>`;
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
  }
}


