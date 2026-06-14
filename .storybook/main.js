import {mergeConfig} from 'vite';
import litcss from 'vite-plugin-lit-css';
import autoprefixer from 'autoprefixer';

/** @type {import('@storybook/web-components-vite').StorybookConfig} */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-coverage",
    "../sb-addons/locale-selector"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {}
  },
  viteFinal: async (config) => {
    // Treat `.css` imports as Lit `css` tagged-template stylesheets, matching
    // the rollup build (rollup-plugin-lit-css). Vite would otherwise inject
    // them as global stylesheets.
    //
    // Provide postcss inline (autoprefixer only) so Vite does NOT auto-load the
    // project's postcss.config.cjs, whose `postcss-lit` syntax parses files as
    // JS/TS and chokes on these plain `.css` files.
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [autoprefixer()]
        }
      },
      plugins: [litcss()]
    });
  }
};

export default config;
