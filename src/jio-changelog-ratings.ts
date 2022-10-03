import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './jio-changelog-weather-icon.js';

@customElement('jio-changelog-ratings')
export class ChangelogRatings extends LitElement {
  static override styles = css`
  .rate-offset { padding-left: 2em; margin-bottom: 5px; }
  .related-issues { display: block; }
  jio-changelog-weather-icon {
    vertical-align: middle;
    margin-right: 2em;
    width: 36px;
    height: 36px;
  }
  jio-changelog-weather-icon:hover {
    cursor: pointer;
  }
  `;

  @property({type: Number}) good = 0;
  @property({type: Number}) nolike = 0;
  @property({type: Number}) rollback = 0;

  @property({type: Array})
  ratings: Array<Number | string> = [];

  @property({type: String})
  version = "";

  override render() {
    const issues = {} as Record<string, Number>;
    for (let i = 0; i < this.ratings.length; i += 2) {
      issues[this.ratings[i].toString()] = this.ratings[i + 1] as Number;
    }

    let relatedIssues = html``;
    const relatedIssueHtml = (issueKey: string) => {
      return html`<span>${`${issues[issueKey]}×`}<a href=${`https://issues.jenkins.io/browse/JENKINS-${issueKey}`}>JENKINS-${issueKey}</a> </span>`;
    };

    if (Object.keys(issues).length > 0) {
      relatedIssues = html`
        <span class="related-issues">
          Community reported issues:
          ${Object.keys(issues).map(relatedIssueHtml)}
        </span>
  `;
    }

    return html`
    <div class="rate-outer">
      <div class="rate-offset">
        <span tabindex="1" role="button" data-direction="good" @click=${this._rate}><jio-changelog-weather-icon count=${this.good} mode='sunny'></jio-changelog-weather-icon></span>
        <span tabindex="2" role="button" data-direction="nolike" @click=${this._rate}><jio-changelog-weather-icon count=${this.nolike} mode='cloudy'></jio-changelog-weather-icon></span>
        <span tabindex="3" role="button" data-direction="rollback" @click=${this._rate}><jio-changelog-weather-icon count=${this.rollback} mode='storm'> </jio-changelog-weather-icon></span>
        ${relatedIssues}
      </div>
    </div>
    `;
  }

  private async _rate(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const dataset = (e.target as HTMLElement).dataset;
    console.log('dataset', dataset);
    if (!dataset) {return;}
    if (!("direction" in dataset)) {return;}

    const rating = dataset.direction as string;

    let issue;
    if (['nolike', 'rollback'].includes(rating)) {
      issue = prompt('Please provide issue number from our JIRA causing trouble:', '');
      if (issue === null) {
        return; // Cancelled
      }
      if (!issue) {
        issue = prompt('Are you sure you do not want to provide an issue reference? It really helps us improve Jenkins.\nEnter issue number, or leave empty to skip:', '');
      }
      if (issue === null) {
        return; // Cancelled
      }
    }

    this.dispatchEvent(new CustomEvent('changelog-ratings-rated', {
      detail: {version: this.version, rating: rating, issue: issue as string},
      bubbles: true,
      composed: true
    }));
    /*
    await fetch('https://rating.jenkins.io/rate/submit.php' + new URLSearchParams({version: this.version, rating: rating, issue: issue as string}).toString());

    alert('Thanks!');

    this.dispatchEvent(new CustomEvent('changelog-ratings-changed', {bubbles: true, composed: true}));
    */
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'jio-changelog-ratings': ChangelogRatings;
    'jio-changelog-weather-icons': ChangelogRatings;
  }
}
