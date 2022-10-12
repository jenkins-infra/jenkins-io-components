import {StoryFn, StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {DatetimeBox} from '../jio-datetime-box';
import '../jio-datetime-box';

export default {
  title: 'Example/DatetimeBox',
  component: 'jio-datetime-box',
} as Meta;

const render = ({endDate, date}) => html`<jio-datetime-box endDate=${ifDefined(endDate)} date=${ifDefined(date)} ></jio-datetime-box>`;

export const WithNoProperties: StoryObj<DatetimeBox> = {render};

export const WithStartTimeISO: StoryObj<DatetimeBox> = {
  render,
  name: 'With Start Time - ISO Str',
  args: {date: '2022-10-01T00:00:00Z'}
};

export const WithStartTimeTimestamp: StoryObj<DatetimeBox> = {
  render,
  name: 'With Start Time - Timestamp',
  args: {date: 1664582400000}
};

export const WithStartAndEndTime: StoryObj<DatetimeBox> = {
  render,
  name: 'With Start and End Time - ISO Str',
  args: {date: '2022-10-01T00:00:00Z', endDate: '2022-12-25T00:00:00Z'}
};
