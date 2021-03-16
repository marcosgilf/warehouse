# Warehouse App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```bash
npm i
```

## Scripts

- `start` runs app for development, reloading on file changes
- `start:build` runs app after it has been built using the build command
- `build` builds app and outputs it in `dist` directory
- `storybook` builds app demo for development, reloading on file changes
- `storybook:build` builds app demo and outputs it in `storybook-static` directory
- `test` runs your test suite with Web Test Runner
- `test:watch` runs your test suite with Web Test Runner for development watcher
- `lint` runs the linter
- `format` runs the prettier formatter
- `release` runs standard-version to update CHANGELOG with latest changes and package.json version

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files inside the project.

## Technology

This app aims to be future proof and use well-supported proven technology. The stack we have chosen should reflect this.

- [lit-html](https://lit-html.polymer-project.org) and [lit-element](https://lit-element.polymer-project.org)
- [npm](http://npmjs.com)
- [open-wc](https://open-wc.org)
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
- [Mocha](https://mochajs.org)
- [Chai](https://www.chaijs.com)
- [ESLint](https://eslint.org)
- [prettier](https://prettier.io)
- [commitlint](https://commitlint.js.org/#/)
- [markdownlint](https://github.com/DavidAnson/markdownlint)
- [prettier-package-json](https://github.com/cameronhunter/prettier-package-json#readme)
- [Storybook](https://storybook.js.org)
- [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Rollup](https://rollupjs.org/)
- Lots and lots of tests
