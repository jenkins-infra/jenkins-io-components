import {StoryFn, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {Navbar} from '../jio-navbar';
import '../jio-navbar';

export default {
  title: 'Example/Navbar',
  component: 'jio-navbar',
  controls: {
    expanded: true
  },
  argTypes: {
    showSearchBox: {
      control: {type: 'boolean'},
    },
    visibleMenu: {table: {disable: true}},
    menuToggled: {table: {disable: true}},
  }
} as Meta;

const Template: StoryFn<Partial<Navbar>> = ({property, showSearchBox}) => html`<jio-navbar
  property=${ifDefined(property)}
  ?showSearchBox=${showSearchBox}
></jio-navbar>`;

export const AllLinksExternal = Template.bind({});
AllLinksExternal.args = {
  property: 'https://webcomponents.jenkins.io'
};

