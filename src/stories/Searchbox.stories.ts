import {StoryObj, Meta} from '@storybook/web-components';
import {within, userEvent} from '@storybook/testing-library';

import {html} from 'lit';

import {Searchbox} from '../jio-searchbox';
import '../jio-searchbox';


const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const waitFor = async function waitFor(f: () => Promise<boolean>) {
  while (!await f()) {await sleep(100);}
};

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
    const wc = canvasElement.querySelector("jio-searchbox") as Searchbox;
    await waitFor(async () => wc.isReady === true);
    Object.defineProperty(wc.shadowRoot, 'outerHTML', {value: ''}); // fake it so jest doesn't complain when using within

    const screen = within(wc.shadowRoot as unknown as HTMLElement);

    userEvent.type(screen.getByTestId('searchbox'), 'governance');
    userEvent.unhover(screen.getByTestId('searchbox'));
  }
};

