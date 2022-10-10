import {setCustomElementsManifest} from '@storybook/web-components';
import customElements from '../custom-elements.json';
setCustomElementsManifest(customElements);

export const parameters = {
  // docs: {inlineStories: false, },
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /(^date$|Date$)/,
      boolean: /^show/,
    },
  },
}
