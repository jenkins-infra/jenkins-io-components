import {Story, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {DatetimeBox} from '../jio-datetime-box';
import '../jio-datetime-box';

export default {
  title: 'Example/DatetimeBox',
  component: 'jio-datetime-box',
} as Meta;

const Template: Story<Partial<DatetimeBox>> = ({endDate, date}) => html`<jio-datetime-box
  endDate=${ifDefined(endDate)}
  date=${ifDefined(date)}
></jio-datetime-box>`;

export const Default = Template.bind({});
Default.args = {};
