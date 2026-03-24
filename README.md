# App Docs

Astro Starlight documentation site configured for GitHub Pages deployment through GitHub Actions.

## Local setup

Requirements:

- Node.js 20 or newer
- Yarn

Install dependencies:

```bash
yarn install
```

Run the local development server:

```bash
yarn dev
```

Create a production build:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

## Project structure

```text
.
├── .github/workflows/pages.yml
├── public/
├── src/content/docs/
│   ├── index.md
│   ├── guides/local-development.md
│   └── reference/github-pages.md
├── astro.config.mjs
├── package.json
└── yarn.lock
```

## GitHub Pages configuration

This project is configured for a GitHub Pages project site hosted at:

```text
https://aminul007bd.github.io/app-docs/
```

Astro uses the repository base path from `BASE_PATH` in CI and falls back to `/app-docs` locally.

To publish the site on GitHub:

1. Push this project to the `main` branch of the repository.
2. In GitHub, open `Settings > Pages`.
3. Under `Build and deployment`, set the source to `GitHub Actions`.

The workflow in `.github/workflows/pages.yml` builds and deploys the site automatically on each push to `main`.
