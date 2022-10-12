const path = require('path');
const postcss = require('postcss');

const processor = postcss(require('../postcss.config.cjs'));

module.exports = {
  core: {
    builder: "webpack5",
    manager: "webpack5",
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": {
    "name": "@storybook/web-components-webpack5",
    "options": {}
  },
  webpackFinal: async (config, {}) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const cssRule = config.module.rules.find(rule => rule.test.toString() === '/\\.css$/');
    cssRule.use = [
      {
        loader: 'lit-css-loader',
        options: {
          transform: (rawCSS, {filePath}) => {
            const {css} = processor.process(rawCSS, {from: filePath})
            return css;
          }
        }
      }
    ];

    // Return the altered config
    return config;
  },
}
