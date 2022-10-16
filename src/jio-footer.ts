import {LitElement, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {relOrAbsoluteLink} from './jio-navbar-link';

import './jio-improve-this-page';
import './jio-report-a-problem';

import globalStyles from './global.css';
import containerStyles from './container.css';
import colStyles from './col.css';
import componentStyles from './jio-footer.css';

const licenseHtmls = {
   'cc-sa': html`
     <div id="creativecommons">
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
           <p>
              <img alt="Creative Commons Attribution-ShareAlike license" src="https://licensebuttons.net/l/by-sa/4.0/88x31.png">
           </p>
        </a>
        <p>
           The content driving this site is licensed under the Creative
           Commons Attribution-ShareAlike 4.0 license.
        </p>
     </div>`
} as Record<string, TemplateResult>;
/**
 * Standard jenkins.io footer
 */
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

   override render() {
      return html`
<footer>
   <div class="container">
      <div class="row">
         <div class="col-md-4">
            <p class="box">
               <jio-improve-this-page sourcePath=${this.sourcePath} githubRepo=${this.githubRepo}></jio-improve-this-page>
               <jio-report-a-problem sourcePath=${this.sourcePath} githubRepo=${this.githubRepo}></jio-report-a-problem>
            </p>
            <div class="license-box">
              ${licenseHtmls[this.license] || html``}
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
                              <a href=${relOrAbsoluteLink('/download/', this.property).href}>Downloads</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/node/', this.property).href}>Blog</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/doc/', this.property).href}>Documentation</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://plugins.jenkins.io/', this.property).href}>Plugins</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/security/', this.property).href}> Security </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/participate/', this.property).href}> Contributing </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Project</h5>
                        <ul class="project">
                           <li>
                              <a href=${relOrAbsoluteLink('/project/', this.property).href}> Structure and governance </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://issues.jenkins.io', this.property).href}> Issue tracker </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/project/roadmap/', this.property).href}> Roadmap </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://github.com/jenkinsci', this.property).href}> GitHub </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://ci.jenkins.io', this.property).href}> Jenkins on Jenkins </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Community</h5>
                        <ul class="community">
                           <li>
                              <a href=${relOrAbsoluteLink('https://community.jenkins.io', this.property).href}> Forum </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/events/', this.property).href}> Events </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/mailing-lists/', this.property).href}> Mailing lists </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/chat/', this.property).href}> Chats </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/sigs/', this.property).href}> Special Interest Groups </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://twitter.com/jenkinsci', this.property).href}> Twitter </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://reddit.com/r/jenkinsci', this.property).href}> Reddit </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Other</h5>
                        <ul class="other">
                           <li>
                              <a href=${relOrAbsoluteLink('/conduct/', this.property).href}> Code of Conduct </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/press/', this.property).href}> Press information </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/merchandise/', this.property).href}> Merchandise </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/artwork/', this.property).href}> Artwork </a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/awards/', this.property).href}> Awards </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
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


