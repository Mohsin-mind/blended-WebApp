# Blended WebApp

## Prerequisites

Make sure you have Node.js installed on your machine. You can download it from the
[official website](https://nodejs.org/).

**Recommended versions:**

- **Node.js:** `v24.3.0`
- **npm:** `v11.4.2`
- **pnpm:** `v10.12.4`

> **Note:** This project uses [Husky](https://typicode.github.io/husky) to enforce commit message
> rules and run pre-commit hooks (linting, formatting, etc.).

## Setup Guide

**Install required packages**

```
pnpm install
```

## Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm build`

Builds the app for production to the `dist` folder using [Vite](https://vitejs.dev/).

### `pnpm preview`

Locally preview the production build.  
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `pnpm lint`

Runs [ESLint](https://eslint.org/) to check for code quality and style issues.

### `pnpm lint-fix`

Automatically fixes lint issues using ESLint.

### `pnpm format`

Formats project files using [Prettier](https://prettier.io/) according to the project configuration.

## Commit Rules

This project uses Husky to enforce commit message conventions and run pre-commit checks (linting,
formatting).  
Please follow the commit message guidelines and do not bypass pre-commit hooks.

## Code Quality

- **Linting:** Configured with ESLint.
- **Formatting:** Enforced with Prettier.
- Both are automatically checked and fixed on commit via Husky hooks.

## Vite Configuration

The project is powered by [Vite](https://vitejs.dev/), which provides fast development and optimized
production builds.  
See `vite.config.js` for custom configuration.

## Learn More

- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky)
