import {StoryObj, Meta} from '@storybook/web-components';

import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {Footer} from '../jio-footer';
import '../jio-footer';

export default {
  title: 'Example/Footer',
  component: 'jio-footer',
  controls: {
    expanded: true
  },
  argTypes: {
  }
} as Meta;

const render = ({property, sourcePath, githubRepo}) => html`<jio-footer
  property=${ifDefined(property)}
  sourcePath=${ifDefined(sourcePath)}
  githubRepo=${ifDefined(githubRepo)}
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
    githubRepo: 'halkeye/jenkins-io-components',
    sourcePath: 'src/stories/Footer.stories.ts',
  }
};

export const NoSourcePath: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://www.jenkins.io',
    githubRepo: 'halkeye/jenkins-io-components',
  }
};

export const ExternalProperty: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://accounts.jenkins.io',
    githubRepo: 'halkeye/jenkins-io-components',
    sourcePath: 'src/stories/Footer.stories.ts',
  }
};
