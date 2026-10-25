import {LitElement, html, nothing, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {msg, str, localized} from '@lit/localize';

import {getLocale} from './jio-locale';
import styles from './jio-thank-a-contributor.css';

const DATA_URL = 'https://raw.githubusercontent.com/jenkins-infra/jenkins-contribution-stats/main/data/honored_contributor.csv';
const REFRESH_INTERVAL = 60 * 60 * 1000;
const MAX_NAMED_REPOSITORIES = 5;
const REQUIRED_COLUMNS = ['MONTH', 'GH_HANDLE', 'GH_HANDLE_AVATAR', 'NBR_PR', 'REPOSITORIES'];

type HonoredContributor = Record<string, string>;

// Splits one CSV line into trimmed fields. The file quotes every field and
// puts a space after each comma. Returns null if a quote is left open.
function parseCsvLine(line: string): string[] | null {
  const fields: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      fields.push(field.trim());
      field = '';
    } else {
      field += char;
    }
  }

  if (quoted) {
    return null;
  }
  fields.push(field.trim());
  return fields;
}

/**
 * Reads the first complete row of honored_contributor.csv by column name.
 * Returns null when a column the note needs is missing, a line is malformed,
 * or no row has all of them filled in.
 */
function parseHonoredContributor(csv: string): HonoredContributor | null {
  const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
  const header = lines.length > 0 ? parseCsvLine(lines[0]) : null;
  if (!header || REQUIRED_COLUMNS.some(column => !header.includes(column))) {
    return null;
  }

  for (const line of lines.slice(1)) {
    const values = parseCsvLine(line);
    if (!values || values.length !== header.length) {
      return null;
    }
    const row = Object.fromEntries(header.map((column, i) => [column, values[i]]));
    if (REQUIRED_COLUMNS.every(column => row[column])) {
      return row;
    }
  }
  return null;
}

function formatMonth(month: string): string | null {
  const date = new Date(`${month}-01T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) {
    return null;
  }
  return new Intl.DateTimeFormat(getLocale(), {month: 'long', year: 'numeric', timeZone: 'UTC'}).format(date);
}

/**
 * Thanks the monthly honored contributor from jenkins-contribution-stats.
 * Renders nothing until the file has loaded, or if it can't be used.
 */
@localized()
@customElement('jio-thank-a-contributor')
export class ThankAContributor extends LitElement {
  static override styles = [styles];

  /**
   * CSV file to read the honored contributor from
   */
  @property()
  dataUrl = DATA_URL;

  @state()
  private contributor: HonoredContributor | null = null;

  private refreshTimer?: number;

  private latestRequest = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.refreshTimer = window.setInterval(() => this.load(), REFRESH_INTERVAL);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.refreshTimer);
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('dataUrl')) {
      this.load();
    }
  }

  private async load() {
    const url = this.dataUrl;
    const request = ++this.latestRequest;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return;
      }
      const contributor = parseHonoredContributor(await response.text());
      // Only the newest request may update the note, so a slow response
      // can't replace data that arrived after it.
      if (request === this.latestRequest && url === this.dataUrl) {
        this.contributor = contributor;
      }
    } catch {
      // Keep whatever is already shown if the file can't be fetched.
    }
  }

  private renderRepositories(repositories: string[]) {
    // Naming more than a few of them makes the sentence hard to read.
    if (repositories.length > MAX_NAMED_REPOSITORIES) {
      return msg(str`${repositories.length} Jenkins repositories`);
    }

    const links = repositories.map((repository, i) => html`${
      i === 0 ? '' : i === repositories.length - 1 ? html` ${msg('and')} ` : ', '
    }<a href=${`https://github.com/${repository}`} target="_blank" rel="noopener noreferrer">${repository.split('/')[1] || repository}</a>`);

    return repositories.length === 1
      ? msg(html`the ${links} repository`)
      : msg(html`the ${links} repositories`);
  }

  override render() {
    const contributor = this.contributor;
    if (!contributor) {
      return nothing;
    }

    const pullRequests = Number.parseInt(contributor.NBR_PR, 10);
    const month = formatMonth(contributor.MONTH);
    const repositories = contributor.REPOSITORIES.split(/\s+/).filter(Boolean);
    if (!Number.isFinite(pullRequests) || !month || repositories.length === 0) {
      return nothing;
    }

    // The profile link is built from the handle so the file can't point it elsewhere.
    const name = html`<a href=${`https://github.com/${encodeURIComponent(contributor.GH_HANDLE)}`} target="_blank" rel="noopener noreferrer">${contributor.FULL_NAME || contributor.GH_HANDLE}</a>`;
    const repos = this.renderRepositories(repositories);

    return html`
      <img part="avatar" src=${contributor.GH_HANDLE_AVATAR} alt="" width="96" height="96" loading="lazy">
      <p part="text">${pullRequests === 1
        ? msg(html`Thank you ${name} for making 1 pull request to ${repos} in ${month}.`)
        : msg(html`Thank you ${name} for making ${pullRequests} pull requests to ${repos} in ${month}.`)
      }</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-thank-a-contributor': ThankAContributor;
  }
}
