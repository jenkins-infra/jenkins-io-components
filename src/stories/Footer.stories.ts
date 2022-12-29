import {StoryObj, Meta} from '@storybook/web-components';

import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
// import {deepQuerySelectorAll} from "shadow-dom-testing-library";
import {expect} from '@storybook/jest';

import {Footer} from '../jio-footer';
import {ImproveThisPage} from '../jio-improve-this-page';
import {ReportAProblem} from '../jio-report-a-problem';
import '../jio-footer';

import {RepoAndSourcePath} from './ImproveThisPage.stories';

export default {
  title: 'Example/Footer',
  component: 'jio-footer',
  controls: {
    expanded: true
  },
  argTypes: {
  }
} as Meta;

const render = ({property, sourcePath, githubRepo, githubBranch}) => html`<jio-footer
  property=${ifDefined(property)}
  sourcePath=${ifDefined(sourcePath)}
  githubRepo=${ifDefined(githubRepo)}
  githubBranch=${ifDefined(githubBranch)}
></jio-footer>`;

export const Default: StoryObj<Footer> = {
  render,
  args: {
  }
};

export const HasSourcePath: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://www.jenkins.io',
    githubRepo: 'jenkins-infra/jenkins-io-components',
    sourcePath: 'src/stories/Footer.stories.ts',
  },
  play: async ({canvasElement, args, ...rest}) => {
    const wc = canvasElement.querySelector("jio-footer") as Footer;

    await RepoAndSourcePath.play({...rest, args, canvasElement: wc.shadowRoot as unknown as HTMLElement});

    const improveThisPage = wc.shadowRoot.querySelector('jio-improve-this-page') as ImproveThisPage;
    expect(improveThisPage.githubBranch).toEqual(args.githubBranch || 'master');
    expect(improveThisPage.githubRepo).toEqual(args.githubRepo || 'jenkins-infra/jenkins-io-components');
    expect(improveThisPage.sourcePath).toEqual(args.sourcePath || 'src/stories/Footer.stories.ts');

    const reportAProblem = wc.shadowRoot.querySelector('jio-report-a-problem') as ReportAProblem;
    expect(reportAProblem.githubBranch).toEqual(args.githubBranch || 'master');
    expect(reportAProblem.githubRepo).toEqual(args.githubRepo || 'jenkins-infra/jenkins-io-components');
    expect(reportAProblem.sourcePath).toEqual(args.sourcePath || 'src/stories/Footer.stories.ts');
  }
};

export const NoSourcePath: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://www.jenkins.io',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  }
};

export const ExternalProperty: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://accounts.jenkins.io',
    githubRepo: 'jenkins-infra/jenkins-io-components',
    sourcePath: 'src/stories/Footer.stories.ts',
  }
};
