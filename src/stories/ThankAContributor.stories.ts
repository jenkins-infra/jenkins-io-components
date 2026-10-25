import {StoryObj, Meta} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect, waitFor} from 'storybook/test';

import {ThankAContributor} from '../jio-thank-a-contributor';
import '../jio-thank-a-contributor';

export default {
  title: 'Example/ThankAContributor',
  component: 'jio-thank-a-contributor',
} as Meta;

const HEADER = ['RUN_DATE', 'MONTH', 'GH_HANDLE', 'FULL_NAME', 'COMPANY', 'GH_HANDLE_URL', 'GH_HANDLE_AVATAR', 'NBR_PR', 'REPOSITORIES'];

const row = (fields: Record<string, string>) => HEADER.map(column => fields[column] ?? '');

const sample = {
  RUN_DATE: '2026-10-19T14-57-04Z',
  MONTH: '2026-09',
  GH_HANDLE: 'janedoe',
  FULL_NAME: 'Jane Doe',
  COMPANY: '',
  GH_HANDLE_URL: 'https://github.com/janedoe',
  GH_HANDLE_AVATAR: 'https://github.com/identicons/janedoe.png',
  NBR_PR: '4',
  REPOSITORIES: 'jenkinsci/jenkins jenkinsci/git-plugin jenkins-infra/plugin-site',
};

// Same layout as honored_contributor.csv: every field quoted, a space after each comma.
const csvUrl = (header: string[], ...rows: string[][]) => {
  const csv = [header, ...rows].map(fields => fields.map(field => `"${field}"`).join(', ')).join('\n');
  return `data:text/csv,${encodeURIComponent(csv)}`;
};

const render = ({dataUrl}: {dataUrl?: string}) => html`<jio-thank-a-contributor
  dataUrl=${ifDefined(dataUrl)}
></jio-thank-a-contributor>`;

const expectText = async (canvasElement: HTMLElement, text: string) => {
  const wc = canvasElement.querySelector('jio-thank-a-contributor') as ThankAContributor;
  await waitFor(() => expect(wc.shadowRoot?.querySelector('p')).toHaveTextContent(text));
  return wc;
};

export const Default: StoryObj<ThankAContributor> = {
  render,
  args: {
    dataUrl: csvUrl(HEADER, row(sample)),
  },
  play: async ({canvasElement}) => {
    const wc = await expectText(canvasElement, 'Thank you Jane Doe for making 4 pull requests to the jenkins, git-plugin and plugin-site repositories in September 2026.');

    const links = Array.from(wc.shadowRoot?.querySelectorAll('a') ?? []).map(a => a.getAttribute('href'));
    expect(links).toEqual([
      'https://github.com/janedoe',
      'https://github.com/jenkinsci/jenkins',
      'https://github.com/jenkinsci/git-plugin',
      'https://github.com/jenkins-infra/plugin-site',
    ]);
    expect(wc.shadowRoot?.querySelector('img')).toHaveAttribute('src', sample.GH_HANDLE_AVATAR);
  }
};

export const OnePullRequest: StoryObj<ThankAContributor> = {
  render,
  args: {
    dataUrl: csvUrl(HEADER, row({...sample, NBR_PR: '1', REPOSITORIES: 'jenkinsci/jenkins'})),
  },
  play: async ({canvasElement}) => {
    await expectText(canvasElement, 'Thank you Jane Doe for making 1 pull request to the jenkins repository in September 2026.');
  }
};

export const ManyRepositories: StoryObj<ThankAContributor> = {
  render,
  args: {
    dataUrl: csvUrl(HEADER, row({...sample, NBR_PR: '9', REPOSITORIES: 'a/one a/two a/three a/four a/five a/six'})),
  },
  play: async ({canvasElement}) => {
    await expectText(canvasElement, 'Thank you Jane Doe for making 9 pull requests to 6 Jenkins repositories in September 2026.');
  }
};

export const NoFullName: StoryObj<ThankAContributor> = {
  render,
  args: {
    dataUrl: csvUrl(HEADER, row({...sample, FULL_NAME: ''})),
  },
  play: async ({canvasElement}) => {
    await expectText(canvasElement, 'Thank you janedoe for making 4 pull requests');
  }
};

export const ColumnsInAnotherOrder: StoryObj<ThankAContributor> = {
  render,
  args: {
    dataUrl: csvUrl([...HEADER].reverse(), row(sample).reverse()),
  },
  play: async ({canvasElement}) => {
    const wc = await expectText(canvasElement, 'Thank you Jane Doe for making 4 pull requests');
    expect(wc.shadowRoot?.querySelector('img')).toHaveAttribute('src', sample.GH_HANDLE_AVATAR);
  }
};

export const MissingColumn: StoryObj<ThankAContributor> = {
  render,
  args: {
    dataUrl: csvUrl(HEADER.filter(column => column !== 'NBR_PR'), row(sample).filter((_, i) => HEADER[i] !== 'NBR_PR')),
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-thank-a-contributor') as ThankAContributor;
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(wc.shadowRoot?.children).toHaveLength(0);
  }
};
