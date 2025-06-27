import {LitElement, html, nothing, TemplateResult} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement, property} from 'lit/decorators.js';
import {msg, localized} from '@lit/localize';

import './jio-improve-this-page';
import './jio-report-a-problem';
import './jio-report-infra-issue';

import globalStyles from './global.css';
import containerStyles from './container.css';
import colStyles from './col.css';
import componentStyles from './jio-footer.css';

const licenseHtmls = {
   'cc-sa': html`
     <div id="creativecommons">
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
           <p>
              <img alt=${msg('Creative Commons Attribution-ShareAlike license')}
                   src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg"
                   width="88" height="31"
              >
           </p>
        </a>
        <p>
           ${msg('The content driving this site is licensed under the Creative Commons Attribution-ShareAlike 4.0 license.')}
        </p>
     </div>`
} as Record<string, TemplateResult>;

/**
 * Standard jenkins.io footer
 */
@localized()
@customElement('jio-footer')
export class Footer extends LitElement {
   static override styles = [globalStyles, containerStyles, colStyles, componentStyles];

   @property()
   license = 'cc-sa';

   @property()
   property = 'https://www.jenkins.io';

   /**
    * Github source path relative to $githubRepo
    */
   @property()
   sourcePath = '';

   /**
    * Github repo
    */
   @property()
   githubRepo = '';

   /**
    * Github branch
    */
   @property()
   githubBranch = 'master';

   /**
    * The name of the bug report template to use
    */
   @property({type: String})
   reportAProblemTemplate = "";

   @property({ type: Boolean })
   skipReportIssue = true;

   private isDocsSite = window.location.hostname === 'docs.jenkins.io';
   private docsVersion = '2.504.x';

   private getDocsUrl(originalPath: string): string {
     const [cleanPath, query, hash] = originalPath.replace(/^https?:\/\/[^\/]+/, '').split(/[?#]/);
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
           pathParts.splice(1, 0, this.docsVersion);
           newPath = '/' + pathParts.join('/');
         } else {
           newPath = `/${this.docsVersion}`;
         }
       }
       
       if (!newPath.endsWith('index.html')) {
         newPath = newPath.replace(/(\/)?$/, '/') + 'index.html';
       }

       let finalUrl = `https://docs.jenkins.io${newPath}`;
       if (query) finalUrl += `?${query}`;
       if (hash) finalUrl += `#${hash}`;
       return finalUrl;
     }

     const baseUrl = this.isDocsSite ? 'https://docs.jenkins.io' : 'https://www.jenkins.io';
     return `${baseUrl}${cleanPath}`;
   }

   private isADownloadsPage() {
     this.skipReportIssue = !(this.sourcePath.includes('/download/') || this.sourcePath.includes('/download/mirrors/'));
   }

   override render() {
      this.isADownloadsPage();
      return html`
<footer>
   <div class="container">
      <div class="row">
         <div class="col-md-4 col1">
            ${!this.skipReportIssue
               ? html`<p class="box"><jio-report-infra-issue sourcePath=${this.sourcePath} githubRepo=${this.githubRepo} .githubBranch=${ifDefined(this.githubBranch)}></jio-report-infra-issue></p>`
               : nothing
            }
            <p class="box"><jio-improve-this-page sourcePath=${this.sourcePath} githubRepo=${this.githubRepo} .githubBranch=${ifDefined(this.githubBranch)}></jio-improve-this-page></p>
            <p class="box"><jio-report-a-problem sourcePath=${this.sourcePath} githubRepo=${this.githubRepo} .githubBranch=${ifDefined(this.githubBranch)} .template=${ifDefined(this.reportAProblemTemplate)}></jio-report-a-problem></p>
            <div class="license-box">
              ${licenseHtmls[this.license] || nothing}
            </div>
         </div>
         <div class="links col-md-8">
            <div class="container">
               <div class="row">
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Resources</h5>
                        <ul class="resources">
                           <li>
                              <a href=${this.getDocsUrl('/download/')}>${msg('Downloads')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/blog/')}>${msg('Blog')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/doc/')}>${msg('Documentation')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://plugins.jenkins.io/')}>${msg('Plugins')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/security/')}>${msg('Security')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/participate/')}>${msg('Contributing')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Project</h5>
                        <ul class="project">
                           <li>
                              <a href=${this.getDocsUrl('/project/')}>${msg('Structure and governance')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://issues.jenkins.io')}>${msg('Issue tracker')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/project/roadmap/')}>${msg('Roadmap')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://github.com/jenkinsci')}>${msg('GitHub')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://ci.jenkins.io')}>${msg('Jenkins on Jenkins')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://stats.jenkins.io')}>${msg('Statistics')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Community</h5>
                        <ul class="community">
                           <li>
                              <a href=${this.getDocsUrl('https://community.jenkins.io')}>${msg('Forum')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/events/')}>${msg('Events')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/mailing-lists/')}>${msg('Mailing lists')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/chat/')}>${msg('Chats')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/sigs/')}>${msg('Special Interest Groups')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://twitter.com/jenkinsci')}>${msg('𝕏 (formerly Twitter)')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('https://reddit.com/r/jenkinsci')}>${msg('Reddit')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Other</h5>
                        <ul class="other">
                           <li>
                              <a href=${this.getDocsUrl('/project/conduct/')}>${msg('Code of Conduct')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/press/')}>${msg('Press information')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/merchandise/')}>${msg('Merchandise')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/artwork/')}>${msg('Artwork')}</a>
                           </li>
                           <li>
                              <a href=${this.getDocsUrl('/awards/')}>${msg('Awards')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="container">
     <div class="row">
        <p>
           Copyright © 2025 CD Foundation The Linux Foundation®. All rights reserved.
           The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our 
            <a href="https://www.linuxfoundation.org/legal/trademark-usage" target="_blank">Trademark Usage</a> page.
           Linux is a registered trademark of Linus Torvalds. 
            <a href="https://www.linuxfoundation.org/legal/privacy-policy" target="_blank">Privacy Policy</a> and 
            <a href="https://www.linuxfoundation.org/legal/terms" target="_blank">Terms of Use</a>.
         </p>
      </div>
   </div>
</footer>
    `;
   }
}

declare global {
   interface HTMLElementTagNameMap {
      'jio-footer': Footer;
   }
}