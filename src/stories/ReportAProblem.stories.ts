import {Story, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {ReportAProblem} from '../jio-report-a-problem';
import '../jio-report-a-problem';

export default {
  title: 'Example/ReportAProblem',
  component: 'jio-report-a-problem',
} as Meta;

const Template: Story<Partial<ReportAProblem>> = ({githubRepo, sourcePath}) => html`<jio-report-a-problem
  sourcePath=${ifDefined(sourcePath)}
  githubRepo=${ifDefined(githubRepo)}
></jio-report-a-problem>`;

export const Default = Template.bind({});
Default.args = {
  sourcePath: 'src/stories/ReportAProblem.ts',
  githubRepo: 'halkeye/jenkins-io-components',
};
