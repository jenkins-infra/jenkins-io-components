import {setCustomElementsManifest} from '@storybook/web-components';
import customElements from '../custom-elements.json';
import {allLocales} from '../src/generated/locale-codes.ts';

setCustomElementsManifest(customElements);

export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*"
  },
  locales: {
    allLocales: allLocales
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /(^date$|Date$)/,
      boolean: /^show/,
    },
  },
}
