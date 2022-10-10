import {Story, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {WeatherIcon} from '../jio-weather-icon';
import '../jio-weather-icon.ts';

export default {
  title: 'Example/WeatherIcon',
  component: 'jio-weather-icon',
  argTypes: {
    weather: {
      options: ['sunny', 'cloudy', 'storm'],
      control: {type: 'select'},
      default: 'sunny',
    }
  }
} as Meta;

const Template: Story<Partial<WeatherIcon>> = ({weather}) => html`<jio-weather-icon weather=${ifDefined(weather)}></jio-weather-icon>`;

export const Sunny = Template.bind({});
Sunny.args = {weather: 'sunny'};

export const Cloudy = Template.bind({});
Cloudy.args = {weather: 'cloudy'};

export const Storm = Template.bind({});
Storm.args = {weather: 'storm'};
