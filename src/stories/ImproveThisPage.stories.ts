import {Story, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {ImproveThisPage} from '../jio-improve-this-page';
import '../jio-improve-this-page';

export default {
  title: 'Example/ImproveThisPage',
  component: 'jio-improve-this-page',
} as Meta;

const Template: Story<Partial<ImproveThisPage>> = ({githubRepo, sourcePath}) => html`<jio-improve-this-page
  sourcePath=${ifDefined(sourcePath)}
  githubRepo=${ifDefined(githubRepo)}
></jio-improve-this-page>`;
;

export const Default = Template.bind({});
Default.args = {
  sourcePath: 'src/stories/ImproveThisPage.ts',
  githubRepo: 'halkeye/jenkins-io-components',
};
