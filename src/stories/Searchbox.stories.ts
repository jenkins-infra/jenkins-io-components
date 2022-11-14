import {StoryObj, Meta} from '@storybook/web-components';
import {within, userEvent} from '@storybook/testing-library';
import {expect} from '@storybook/jest';

import {html} from 'lit';

import {Searchbox} from '../jio-searchbox';
import '../jio-searchbox';

export default {
  title: 'Example/Searchbox',
  component: 'jio-searchbox',
  controls: {
    expanded: true
  },
  argTypes: {
  }
} as Meta;

const render = () => html`<jio-searchbox></jio-searchbox>`;

export const Default: StoryObj<Searchbox> = {
  render,
  args: {},
};

export const Searched: StoryObj<Searchbox> = {
  render,
  args: {},
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector("jio-searchbox").shadowRoot as unknown as HTMLElement;
    await new Promise(resolve => canvasElement.addEventListener('jio-searchbox:ready', resolve, {once: true}));
    Object.defineProperty(wc, 'outerHTML', {value: ''}); // fake it so jest doesn't complain when using within

    const screen = within(wc);

    await userEvent.type(screen.getByTestId('searchbox'), 'governance');
    await userEvent.unhover(screen.getByTestId('searchbox'));

    expect((await screen.findByRole('listbox')).closest('.algolia-autocomplete')).toHaveClass('algolia-autocomplete-left');
  }
};

