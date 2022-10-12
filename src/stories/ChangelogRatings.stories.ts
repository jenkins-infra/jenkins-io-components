import {StoryFn, Meta} from '@storybook/web-components';
import {action} from '@storybook/addon-actions';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {ChangelogRatings} from '../jio-changelog-ratings';
import '../jio-components';

export default {
  title: 'Example/ChangelogRatings',
  component: 'jio-changelog-ratings',
} as Meta;

const Template: StoryFn<Partial<ChangelogRatings>> = ({good, nolike, rollback, version, ratings}) => {
  const ratingsJSON = ratings === undefined ? undefined : JSON.stringify(ratings);
  return html`<jio-changelog-ratings
    @changelog-ratings-rated=${action('changelog-ratings-rated')}
    @changelog-ratings-canceled=${action('changelog-ratings-canceled')}
    good=${ifDefined(good)}
    nolike=${ifDefined(nolike)}
    rollback=${ifDefined(rollback)}
    version=${ifDefined(version)}
    ratings=${ifDefined(ratingsJSON)}
  ></jio-changelog-ratings>`;
};

export const Default = Template.bind({});
Default.args = {
  good: 10,
  nolike: 20,
  rollback: 30,
  version: '2.345',
  ratings: ["63232", 1, "63506", 1, "61990", 5],
};

