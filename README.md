# Welcome to Jenkins.io Web Components

This is an attempt to build web components that can be used across various jenkins.io based projects.

## Setup

Install dependencies:

```bash
npm i
```

## Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Testing

This sample uses modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors) as well as against Lit's production mode:

```bash
npm test
```

For local testing during development, the `test:dev:watch` command will run your tests in Lit's development mode (with verbose errors) on every change to your source files:

```bash
npm test:watch
```

Alternatively the `test:prod` and `test:prod:watch` commands will run your tests in Lit's production mode.

## Dev Server

To run the dev server and open the project in a new browser tab:

```bash
npm run storybook
```

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

