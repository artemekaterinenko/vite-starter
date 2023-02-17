# Vite-Starter

## Features

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [Tailwind CSS v3](https://tailwindcss.com) with a [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that automatically sorts classes.
- Use [ESLint](https://eslint.org) and [Prettier](https://prettier.io) on VSCode and before you commit with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Write unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).
- Write e2e tests with [Cypress](https://www.cypress.io).
- GitHub Actions for automatic [dependency updates](https://github.com/features/security/), running tests and code coverage with [Codecov](https://about.codecov.io/).
- Deploy to [vercel.com](https://vercel.com/) with pre-configured [SPA fallback](https://vercel.com/docs/configuration#routes/advanced/spa-fallback).

## Getting started

Use [degit](https://github.com/Rich-Harris/degit) to clone to your machine with an empty git history:

```
npx degit artemekaterinenko/vite-starter#main my-app
```

Then, install the dependencies:

```
pnpm install
```

### Before you start coding

- [ ] If you don't plan to use GitHub Actions, delete the `.github` directory.
- [ ] Change the `favicon.png`, `apple-touch-icon.png`, `android-chrome-192x192.png` and `android-chrome-512x512.png`. [favicon.io](https://favicon.io) is a cool tool for generating these assets.
- [ ] If you don't plan to use `@tanstack/react-query` or `@tanstack/react-router`, remove the packages and the logic in the `index.tsx` file.
- [ ] Change the title, description and theme color in the `index.html` and `vite.config.ts`.
- [ ] Modify or delete the `LICENSE` file.
- [ ] Change the `name` field in package.json.

## Scripts

- `pnpm dev` - start a development server with hot reload.
- `pnpm dev-mocks` - start a development server with `mocks` (mocked api calls) folder.
- `pnpm build` - build for production. The generated files will be on the `dist` folder.
- `pnpm preview` - locally preview the production build.
- `pnpm test` - run unit and integration tests related to changed files based on git.
- `pnpm test:ci` - run all unit and integration tests in CI mode.
- `pnpm test:e2e` - run all e2e tests with the Cypress Test Runner.
- `pnpm test:e2e:headless` - run all e2e tests headlessly.
- `pnpm format` - format all files with Prettier.
- `pnpm lint` - runs TypeScript and ESLint.
- `pnpm validate` - runs `lint`, `test:ci` and `test:e2e:ci`.
