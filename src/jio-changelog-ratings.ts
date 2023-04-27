import {LitElement, nothing, html, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './jio-changelog-weather-icon';

@customElement('jio-changelog-ratings')
export class ChangelogRatings extends LitElement {
  static override styles = css`
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
  ratings: Array<number | string> = [];

  @property({type: String})
  version = "";

  override render() {
    const issues = {} as Record<string, number>;
    for (let i = 0; i < this.ratings.length; i += 2) {
      // disabling lint rule as this isn't assigning, just reading from
      // eslint-disable-next-line lit/no-this-assign-in-render
      issues[this.ratings[i].toString()] = this.ratings[i + 1] as number;
    }

    let relatedIssues: TemplateResult | symbol = nothing;
    const relatedIssueHtml = (issueKey: string) => {
      return html`<span>${`${issues[issueKey]}×`}<a href=${`https://issues.jenkins.io/browse/JENKINS-${issueKey}`}>JENKINS-${issueKey}</a> </span>`;
    };

    const issueSort = (aIssueKey: string, bIssueKey: string): number => {
      return issues[bIssueKey] - issues[aIssueKey];
    };

    if (Object.keys(issues).length > 0) {
      const body = Object.keys(issues).sort(issueSort).map(relatedIssueHtml);
      relatedIssues = html`<span class="related-issues">Community reported issues: ${body}</span>`;
    }

    return html`
    <div>
      <span tabindex="0" role="button" data-direction="good" @click=${this._rate}><jio-changelog-weather-icon count=${this.good} mode='sunny'></jio-changelog-weather-icon></span>
      <span tabindex="0" role="button" data-direction="nolike" @click=${this._rate}><jio-changelog-weather-icon count=${this.nolike} mode='cloudy'></jio-changelog-weather-icon></span>
      <span tabindex="0" role="button" data-direction="rollback" @click=${this._rate}><jio-changelog-weather-icon count=${this.rollback} mode='storm'> </jio-changelog-weather-icon></span>
      ${relatedIssues}
    </div>
    `;
  }

  private async _rate(e: Event) {
    const dataset = (e.currentTarget as HTMLElement).dataset;
    if (!dataset) {return;}
    if (!("direction" in dataset)) {return;}

    e.preventDefault();
    e.stopPropagation();

    const rating = dataset.direction as string;

    let issue;
    if (['nolike', 'rollback'].includes(rating)) {
      issue = this._prompt('Please provide issue number from our JIRA causing trouble:', '');
      if (issue === null) {
        this.dispatchEvent(new CustomEvent('changelog-ratings-canceled', {bubbles: true, composed: true}));
        return; // Cancelled
      }
      if (!issue) {
        issue = this._prompt('Are you sure you do not want to provide an issue reference? It really helps us improve Jenkins.\nEnter issue number, or leave empty to skip:', '');
      }
      if (issue === null) {
        this.dispatchEvent(new CustomEvent('changelog-ratings-canceled', {bubbles: true, composed: true}));
        return; // Cancelled
      }
    }

    const ratingEnum = {
      'good': 1,
      'nolike': 0,
      'rollback': -1,
    } as Record<string, number>;

    this.dispatchEvent(new CustomEvent('changelog-ratings-rated', {
      detail: {version: this.version, rating: ratingEnum[rating], issue: issue as string},
      bubbles: true,
      composed: true
    }));
    /*
    await fetch('https://rating.jenkins.io/rate/submit.php' + new URLSearchParams({version: this.version, rating: rating, issue: issue as string}).toString());

    alert('Thanks!');

    this.dispatchEvent(new CustomEvent('changelog-ratings-changed', {bubbles: true, composed: true}));
    */
  }

  private _prompt(message?: string, _default?: string): string | null {
    return window.prompt(message, _default);
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'jio-changelog-ratings': ChangelogRatings;
  }
}
