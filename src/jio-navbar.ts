import {LitElement, html, nothing, TemplateResult} from 'lit';
import {customElement, state, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {msg, localized} from '@lit/localize';

import './jio-locale';
import './jio-cdf-logo';
import './jio-navbar-link';
import './jio-searchbox';

import globalStyles from './global.css';
import styles from './jio-navbar.css';

export type NavbarItemLink = {
  label: TemplateResult | string;
  link: string | Array<NavbarItemLink>;
  header?: boolean;
  title?: string;
};

export type Theme = 'dark' | 'light' | 'auto';

export type DocVersion = {
  version: string;
  label: string;
  url?: string;
};

@localized()
@customElement('jio-navbar')
export class Navbar extends LitElement {
  static override styles = [globalStyles, styles];

  /**
   * Eg plugins.jenkins.io
   */
  @property()
  property = 'https://www.jenkins.io';

  /**
   * Show search box
   */
  @property({type: Boolean})
  showSearchBox: Boolean = false;

  @property()
  locationPathname: string = location.pathname;

  /**
   * Header theme (light/dark/auto)
   */
  @property()
  theme = 'light';

  /**
   * Documentation versions data URL - can be local or remote text file
   */
  @property({type: String})
  docVersionsUrl = '/doc-versions.txt';

  /**
   * Documentation versions
   */
  @property({type: Array})
  docVersions: Array<DocVersion> = [];

  /**
   * Currently active documentation version
   */
  @property({type: String})
  currentDocVersion = '';

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

  /**
   * Loading state for versions
   * @private
   */
  @state()
  private versionsLoading = false;

  private isDocsSite = window.location.hostname === 'docs.jenkins.io';

  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
    
    this.loadDocVersions();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  async loadDocVersions() {
    if (!this.isDocsSite) return;

    this.versionsLoading = true;
    try {
      const response = await fetch(this.docVersionsUrl);
      if (response.ok) {
        const text = await response.text();
        this.docVersions = this.parseVersionsText(text);
        
        if (!this.currentDocVersion && this.docVersions.length > 0) {
          const stableVersion = this.docVersions.find(v => v.label === 'Stable') || this.docVersions[0];
          this.currentDocVersion = stableVersion.version;
        }
      } else {
        console.warn('Failed to load doc versions, using fallback');
        this.setFallbackVersions();
      }
    } catch (error) {
      console.warn('Error loading doc versions, using fallback:', error);
      this.setFallbackVersions();
    } finally {
      this.versionsLoading = false;
    }
  }

  private parseVersionsText(text: string): DocVersion[] {
    const versions: DocVersion[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));

    for (const line of lines) {
      const parts = line.split('|').map(part => part.trim());
      if (parts.length >= 2) {
        const version = parts[0];
        const label = parts[1];
        const url = parts[2] || `/${version}/`;
        
        versions.push({
          version,
          label,
          url
        });
      }
    }

    return versions;
  }

  private setFallbackVersions() {
    // Fallback to current versions if loading fails
    this.docVersions = [
      {version: '2.504.x', label: 'Stable', url: '/2.504.x/'},
      {version: '2.516.x', label: 'Latest', url: '/2.516.x/'},
      {version: 'main', label: 'Development', url: '/main/'}
    ];
    if (!this.currentDocVersion) {
      this.currentDocVersion = '2.504.x';
    }
  }

  handleDocumentClick() {
    this.visibleMenu = -1;
  }

  private getDocsUrl(originalPath: string): string {
    const [cleanPath, query, hash] = originalPath.replace(/^https?:\/\/[^/]+/, '').split(/[?#]/);
    
    const docMappings: Record<string, {path: string, versioned: boolean}> = {
      // User Guide sections (versioned)
      '/doc/book': {path: '/user-docs', versioned: true},
      '/doc/book/installing': {path: '/user-docs/installing-jenkins', versioned: true},
      '/doc/book/pipeline': {path: '/user-docs/pipeline', versioned: true},
      '/doc/book/managing': {path: '/user-docs/managing', versioned: true},
      '/doc/book/security': {path: '/user-docs/security', versioned: true},
      '/doc/book/system-administration': {path: '/user-docs/system-administration', versioned: true},
      '/doc/book/troubleshooting': {path: '/user-docs/troubleshooting', versioned: true},
      '/doc/book/glossary': {path: '/user-docs/glossary', versioned: true},
      
      // Solutions (versioned)
      '/solutions': {path: '/solutions', versioned: true},
      
      // Tutorials (versioned)
      '/doc/tutorials': {path: '/tutorials', versioned: true},
      
      // Developer Guide (not versioned)
      '/doc/developer': {path: '/dev-docs', versioned: false},
      
      // Community sections
      '/participate': {path: '/community', versioned: false},
      '/chat': {path: '/community/chat', versioned: false},
      '/projects/jam': {path: '/community/meet', versioned: false},
      '/events': {path: '/events', versioned: false},
      '/mailing-lists': {path: '/community/mailing-lists', versioned: false},
      
      // Subprojects
      '/sigs/docs/gsod/2020/projects/document-jenkins-on-kubernetes': {
        path: '/sigs/docs/gsod/2020/projects/document-jenkins-on-kubernetes', 
        versioned: false
      },
      
      // Security
      '/security/reporting': {path: '/security/reporting', versioned: false},
      
      // About sections
      '/project/roadmap': {path: '/about', versioned: false},
      '/project/conduct': {path: '/project/conduct', versioned: false},
      '/artwork': {path: '/images', versioned: false}
    };

    const mappingEntry = Object.entries(docMappings).find(([original]) => 
      cleanPath.startsWith(original)
    );
  
    if (mappingEntry && this.isDocsSite) {
      const [original, {path: replacement, versioned}] = mappingEntry;
      let newPath = cleanPath.replace(original, replacement);
      
      if (versioned) {
        const pathParts = newPath.split('/').filter(part => part !== '');
        if (pathParts.length >= 1) {
          pathParts.splice(1, 0, this.currentDocVersion);
          newPath = '/' + pathParts.join('/');
        } else {
          newPath = `/${this.currentDocVersion}`;
        }
      }
      
      if (!newPath.endsWith('index.html')) {
        newPath = newPath.replace(/(\/)?$/, '/') + 'index.html';
      }

      // Reconstruct URL with query/hash if they existed
      let finalUrl = `https://docs.jenkins.io${newPath}`;
      if (query) finalUrl += `?${query}`;
      if (hash) finalUrl += `#${hash}`;
      return finalUrl;
    }

    // For all other paths, use standard behavior
    const baseUrl = this.isDocsSite ? 'https://docs.jenkins.io' : 'https://www.jenkins.io';
    return `${baseUrl}${cleanPath}`;
  }

  private _handleVersionChange(e: Event) {
    const newVersion = (e.target as HTMLSelectElement).value;
    if (newVersion !== this.currentDocVersion) {
      this.currentDocVersion = newVersion;
      
      const selectedVersion = this.docVersions.find(v => v.version === newVersion);
      if (selectedVersion?.url) {
        window.location.href = selectedVersion.url;
        return;
      }
      
      this.dispatchEvent(new CustomEvent('version-changed', {
        detail: { version: this.currentDocVersion }
      }));

      if (this.isDocsSite) {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part !== '');
        
        if (pathParts.length > 0 && this.docVersions.some(v => v.version === pathParts[0])) {
          pathParts[0] = this.currentDocVersion;
          const newPath = '/' + pathParts.join('/');
          window.location.href = newPath + window.location.search + window.location.hash;
        }
      }
    }
  }

  private renderVersionOptions() {
    return this.docVersions.map(version => html`
      <option 
        value=${version.version}
        ?selected=${version.version === this.currentDocVersion}
      >
        ${version.label} (${version.version})
      </option>
    `);
  }

  override render() {
    const cdfMenuItems = [
      {label: msg("What is CDF?"), link: "https://cd.foundation/"},
      {label: msg("Jenkins X"), link: "https://jenkins-x.io/"},
      {label: msg("Tekton"), link: "https://tekton.dev/"},
      {label: msg("Spinnaker"), link: "https://www.spinnaker.io/"},
    ];
    
    const menuItems = [
      {label: msg("Blog"), link: "/blog/"},
      {label: msg("Success Stories"), link: "https://stories.jenkins.io/"},
      {label: msg("Contributor Spotlight"), link: "https://contributors.jenkins.io/"},
      {
        label: msg("Documentation"), link: [
          {
            label: msg("All Versions"), 
            link: this.isDocsSite ? "/versions/" : "https://docs.jenkins.io/versions/",
            header: true
          },
          {label: msg("User Guide"), 
            link: this.getDocsUrl("/doc/book"),
            header: true
          },
          {label: "- " + msg("Installing Jenkins"), link: this.getDocsUrl("/doc/book/installing/")},
          {label: "- " + msg("Jenkins Pipeline"), link: this.getDocsUrl("/doc/book/pipeline/")},
          {label: "- " + msg("Managing Jenkins"), link: this.getDocsUrl("/doc/book/managing/")},
          {label: "- " + msg("Securing Jenkins"), link: this.getDocsUrl("/doc/book/security/")},
          {label: "- " + msg("System Administration"), link: this.getDocsUrl("/doc/book/system-administration/")},
          {label: "- " + msg("Troubleshooting Jenkins"), link: this.getDocsUrl("/doc/book/troubleshooting/")},
          {label: "- " + msg("Terms and Definitions"), link: this.getDocsUrl("/doc/book/glossary/")},
          
          {label: msg("Solution Pages"), link: this.getDocsUrl("/solutions"), header: true},
          
          {
            label: msg("Tutorials"), 
            link: this.getDocsUrl("/doc/tutorials"), 
            header: true
          },
          
          {
            label: msg("Developer Guide"), 
            link: this.getDocsUrl("/doc/developer"), 
            header: true
          },
          
          {label: msg("Contributor Guide"), link: this.getDocsUrl("/participate"), header: true},
          {label: msg("Books"), link: this.getDocsUrl("/books"), header: true},
        ]
      },
      {label: msg("Plugins"), link: "https://plugins.jenkins.io/"},
      {
        label: msg("Community"), link: [
          {
            label: msg("Overview"), link: this.getDocsUrl("/participate/")
          },
          {
            label: msg("Chat"), link: this.getDocsUrl("/chat/"), title: "Chat with the rest of the Jenkins community on IRC"
          },
          {label: msg("Meet"), link: this.getDocsUrl("/projects/jam/")},
          {
            label: msg("Events"), link: this.getDocsUrl("/events/")
          },
          {label: msg("Forum"), link: "https://community.jenkins.io/"},
          {label: msg("Issue Tracker"), link: "https://issues.jenkins.io/"},
          {label: msg("Mailing Lists"), link: this.getDocsUrl("/mailing-lists/"), title: "Browse Jenkins mailing list archives and/ or subscribe to lists"},
          {label: msg("Roadmap"), link: this.getDocsUrl("/project/roadmap/")},
          {label: msg("Account Management"), link: "https://accounts.jenkins.io/", title: "Create/manage your account for accessing wiki, issue tracker, etc"},
          {
            label: msg("Special Interest Groups"), link: this.getDocsUrl("/sigs/"), header: true
          },
          {label: "- " + msg("Advocacy and Outreach"), link: this.getDocsUrl("/sigs/advocacy-and-outreach/")},
          {label: "- " + msg("Documentation"), link: this.getDocsUrl("/sigs/docs/")},
          {label: "- " + msg("Google Summer of Code"), link: this.getDocsUrl("/sigs/gsoc/")},
          {label: "- " + msg("Platform"), link: this.getDocsUrl("/sigs/platform/")},
          {label: "- " + msg("User Experience"), link: this.getDocsUrl("/sigs/ux/")},
        ]
      },
      {
        label: msg("Subprojects"), link: [
          {
            label: msg("Overview"), link: this.getDocsUrl("/projects/")
          },
          {label: msg("Google Summer of Code in Jenkins"), link: this.getDocsUrl("/projects/gsoc/")},
          {label: msg("Infrastructure"), link: this.getDocsUrl("/projects/infrastructure/")},
          {label: msg("CI/CD and Jenkins Area Meetups"), link: this.getDocsUrl("/projects/jam/")},
          {label: msg("Jenkins Configuration as Code"), link: this.getDocsUrl("/projects/jcasc/")},
          {label: msg("Jenkins Operator"), link: this.getDocsUrl("/projects/jenkins-operator/")},
          {label: msg("Jenkins Remoting"), link: this.getDocsUrl("/projects/remoting/")},
          {label: msg("Document Jenkins on Kubernetes"), link: this.getDocsUrl("/sigs/docs/gsod/2020/projects/document-jenkins-on-kubernetes/")},
        ]
      },
      {
        label: msg("Security"), link: [
          {
            label: msg("Overview"), link: this.getDocsUrl("/security/")
          },
          {label: msg("Security Advisories"), link: this.getDocsUrl("/security/advisories/")},
          {label: msg("Reporting Vulnerabilities"), link: this.getDocsUrl("/security/reporting/")},
        ]
      },
      {
        label: msg("About"), link: [
          {label: msg("Roadmap"), link: this.getDocsUrl("/project/roadmap/")},
          {
            label: msg("Press"), link: this.getDocsUrl("/press/")
          },
          {
            label: msg("Awards"), link: this.getDocsUrl("/awards/")
          },
          {label: msg("Conduct"), link: this.getDocsUrl("/project/conduct/")},
          {label: msg("Artwork"), link: this.getDocsUrl("/artwork/")},
        ]
      }
    ] as Array<NavbarItemLink>;

    const menuItemsHtml = menuItems.map((menuItem, idx) => {
      if (menuItem.link && Array.isArray(menuItem.link)) {
        return this.renderNavItemDropdown(menuItem, idx, this.visibleMenu === idx);
      }
      return html`<li class="nav-item">${this.renderNavItemLink(menuItem)}</li>`;
    });

    const versionOptions = this.renderVersionOptions();
    const versionSelector = this.isDocsSite && this.docVersions.length > 1 ? html`
      <div class="version-selector">
        <select @change=${this._handleVersionChange} ?disabled=${this.versionsLoading}>
          ${this.versionsLoading ? html`<option>Loading...</option>` : versionOptions}
        </select>
      </div>
    ` : nothing;

    const searchboxHtml = !this.showSearchBox ? nothing : html`<jio-searchbox @click=${this._handleSearchboxClick}></jio-searchbox>`;
    
    return html`
      <nav class="navbar" data-theme=${this.theme}>
        <span class="navbar-brand">
          <slot name="brand">
            <a href="/">Jenkins</a>
          </slot>
        </span>
        
        ${versionSelector}
        
        <button
          class="navbar-toggler collapsed btn"
          type="button"
          @click=${this._clickCollapseButton}
          aria-controls="navbarSupportedContent"
          aria-expanded=${this.menuToggled}
          aria-label="Toggle navigation">
          <ion-icon name=${this.menuToggled ? "close-outline" : "menu-outline"} title="Toggle Menu Visible"></ion-icon>
        </button>
        
        <div class="navbar-menu collapse ${this.menuToggled ? "show" : ""}">
          <ul class="nav navbar-nav mr-auto">
            ${this.renderNavItemDropdown({label: html`<jio-cdf-logo></jio-cdf-logo>`, link: cdfMenuItems}, 99, this.visibleMenu === 99)}
          </ul>
          <ul class="nav navbar-nav ml-auto">
            ${menuItemsHtml}
            <li class="nav-item download-btn">
              ${this.renderNavItemLink({link: '/download/', label: 'Download', }, ['btn btn-outline-secondary'])}
            </li>
            <slot name="rightMenuItems" @slotchange=${this.handleSlotchange}></slot>
          </ul>
        </div>
        ${searchboxHtml}
      </nav>
    `;
  }

  handleSlotchange(e: Event) {
    const slotElement = (e.target as HTMLSlotElement);
    const assignedElements = slotElement.assignedElements();
    const container = slotElement.parentNode as HTMLElement;
    for (const element of assignedElements) {
      for (const link of element.querySelectorAll('jio-navbar-link')) {
        const wrapper = document.createElement('li');
        wrapper.className = "nav-item";
        wrapper.appendChild(link);
        container.appendChild(wrapper);
      }
    }
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
    }

    // TODO - header navbar links should never be active
    return html`<jio-navbar-link
      .class=${ifDefined(extraClasses.join(" "))}
      .locationPathname=${ifDefined(this.locationPathname)}
      .property=${this.property}
      ?header=${menuItem.header}
      href=${menuItem.link}
      title=${ifDefined(menuItem.title)}
      >${menuItem.header ? html`<strong>${menuItem.label}</strong>` : menuItem.label}</jio-navbar-link>`;
  }

  private _clickCollapseButton(e: Event) {
    e.preventDefault();
    this.menuToggled = !this.menuToggled;
  }

  private _handleSearchboxClick() {
    if (this.menuToggled) {
      this.menuToggled = false;
    }
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