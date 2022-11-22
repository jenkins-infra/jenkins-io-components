import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {ImproveThisPage} from '../jio-improve-this-page';
import '../jio-improve-this-page';

export default {
  title: 'Example/ImproveThisPage',
  component: 'jio-improve-this-page',
} as Meta;

const render = ({githubRepo, sourcePath, githubBranch}) => html`<jio-improve-this-page
  sourcePath=${ifDefined(sourcePath)}
  githubRepo=${ifDefined(githubRepo)}
  githubBranch=${ifDefined(githubBranch)}
></jio-improve-this-page>`;
;

export const Default: StoryObj<ImproveThisPage> = {
  render,
  args: {
    sourcePath: 'src/stories/ImproveThisPage.ts',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  }
};
