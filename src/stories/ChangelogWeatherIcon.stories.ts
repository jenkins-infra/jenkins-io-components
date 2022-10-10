import {Story, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {ChangelogWeatherIcon} from '../jio-changelog-weather-icon';
import '../jio-components';

export default {
  title: 'Example/ChangelogWeatherIcon',
  component: 'jio-changelog-weather-icon',
  argTypes: {
    mode: {
      options: ['sunny', 'cloudy', 'storm'],
      control: {type: 'select'},
      default: 'sunny',
    }
  }
} as Meta;

const Template: Story<Partial<ChangelogWeatherIcon>> = ({count, mode}) => html`<jio-changelog-weather-icon mode=${ifDefined(mode)} count=${ifDefined(count)}></jio-changelog-weather-icon>`;

export const Default = Template.bind({});
Default.args = {
  count: 10,
};


