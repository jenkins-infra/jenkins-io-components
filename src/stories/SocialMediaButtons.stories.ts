import {Story, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {SocialMediaButtons} from '../jio-socialmedia-buttons';
import '../jio-components';

export default {
  title: 'Example/SocialMediaButtons',
  component: 'jio-socialmedia-buttons',
} as Meta;

const Template: Story<Partial<SocialMediaButtons>> = ({
  github, twitter, linkedin, blog
}) => html`<jio-socialmedia-buttons
  github=${ifDefined(github)}
  twitter=${ifDefined(twitter)}
  linkedin=${ifDefined(linkedin)}
  blog=${ifDefined(blog)}
></jio-socialmedia-buttons>`;

export const Github = Template.bind({});
Github.args = {github: "halkeye", };

export const LinkedIn = Template.bind({});
LinkedIn.args = {linkedin: "halkeye", };

export const Twitter = Template.bind({});
Twitter.args = {twitter: "halkeye", };

export const Blog = Template.bind({});
Blog.args = {blog: "https://g4v.dev", };

export const Combined = Template.bind({});
Combined.args = {
  ...Github.args,
  ...LinkedIn.args,
  ...Twitter.args,
  ...Blog.args,
};

