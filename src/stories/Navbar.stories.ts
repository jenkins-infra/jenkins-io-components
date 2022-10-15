import {StoryObj, StoryFn, Meta} from '@storybook/web-components';
import {within, waitFor, userEvent} from '@storybook/testing-library';

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
    showSearchBox: {control: {type: 'boolean'}, },
    visibleMenu: {table: {disable: true}},
    menuToggled: {table: {disable: true}},
  }
} as Meta;

const render = ({property, showSearchBox, locationHref}) => html`<jio-navbar
  property=${ifDefined(property)}
  .locationHref=${ifDefined(locationHref)}
  ?showSearchBox=${showSearchBox}
></jio-navbar>`;


const Template: StoryFn<Partial<Navbar>> = ({property, showSearchBox}) => html`<jio-navbar
  property=${ifDefined(property)}
  ?showSearchBox=${showSearchBox}
></jio-navbar>`;

export const AllLinksExternal = Template.bind({});
AllLinksExternal.args = {
  property: 'https://webcomponents.jenkins.io'
};
AllLinksExternal.play = async ({canvasElement}) => {
};

export const SamePropertyActiveLink: StoryObj<Navbar> = {
  render,
  name: "Active link inside dropdown",
  args: {
    property: 'https://www.jenkins.io',
    locationHref: '/press/'
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector("jio-navbar") as Navbar;
    const root = await waitFor(() => (wc.shadowRoot as ShadowRoot).firstElementChild as HTMLElement, {
      timeout: 5000
    });

    const screen = within(root);

    console.log('active gavin');
    const aboutDropdown = await screen.findByText('About');
    console.log('aboutDropdown', aboutDropdown);
    return userEvent.click(aboutDropdown);
  }
};

export const SamePropertyActiveToplevelLink: StoryObj<Navbar> = {
  render,
  name: "Active link outside dropdown",
  args: {
    property: 'https://www.jenkins.io',
    locationHref: '/node/'
  }
};

