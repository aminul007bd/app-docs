# Astro Starlight on GitHub Pages

This document describes how to replace the current Ruby/Jekyll setup with a Node.js + Markdown + Astro Starlight site that deploys automatically to GitHub Pages on every commit to `main`.

## Goal

- Use Node.js instead of Ruby
- Keep writing docs in Markdown
- Use Astro Starlight as the documentation framework
- Keep GitHub Pages as the hosting platform
- Deploy automatically through GitHub Actions when changes are pushed to `main`

## How it works

1. Astro Starlight reads your Markdown files and builds a static site.
2. GitHub Actions runs the build on every push to `main`.
3. The generated static files are deployed to GitHub Pages.
4. Any commit merged into `main` updates the published docs site.

## Prerequisites

- Node.js 20 or newer
- Yarn
- GitHub Pages enabled for this repository
- GitHub Actions enabled for this repository

Check your versions:

```bash
node --version
yarn --version
```

## Step 1: Initialize Astro Starlight

From the repository root, create the Astro project:

```bash
yarn create astro .
```

When prompted:

- Choose to create the project in the current directory
- Choose to install dependencies
- Choose TypeScript if you want it, or keep JavaScript for a simpler setup

Then add Starlight:

```bash
yarn astro add starlight
```

If you prefer to start from the Starlight template directly, you can also use:

```bash
yarn create astro --template starlight
```

## Step 2: Move your docs into Astro

Astro Starlight expects docs content in `src/content/docs/`.

Recommended structure:

```text
src/content/docs/
  index.md
  api-usage.md
  endpoints/
    index.md
    donations.md
    participants.md
```

Map the current files like this:

- `index.markdown` -> `src/content/docs/index.md`
- `api-usage.markdown` -> `src/content/docs/api-usage.md`
- `endpoints/index.markdown` -> `src/content/docs/endpoints/index.md`
- `endpoints/donations.markdown` -> `src/content/docs/endpoints/donations.md`
- `endpoints/participants.markdown` -> `src/content/docs/endpoints/participants.md`

## Step 3: Convert the front matter

Jekyll front matter will need to be adjusted for Starlight.

Example Jekyll front matter:

```yaml
---
layout: default
title: Using the API
permalink: /api-usage/
nav_order: 1
---
```

Example Starlight front matter:

```yaml
---
title: Using the API
description: How to authenticate and query the Partner Data Access API.
---
```

You should remove Jekyll-specific fields such as:

- `layout`
- `permalink`
- `nav_order`
- `parent`

Navigation will be controlled from the Astro config instead.

## Step 4: Replace Jekyll-specific Markdown syntax

This repo currently uses note callouts like this:

```md
{: .note }
All dates are in UTC timezone
```

In Starlight, replace them with admonitions:

```md
:::note
All dates are in UTC timezone
:::
```

## Step 5: Configure Astro Starlight navigation

Define the docs navigation in `astro.config.mjs`.

Example:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/YOUR_REPOSITORY_NAME',
  integrations: [
    starlight({
      title: 'Pledge It: Partner Data Access API',
      sidebar: [
        {
          label: 'Documentation',
          items: [
            { label: 'API Overview', link: '/' },
            { label: 'Using the API', link: '/api-usage/' },
            {
              label: 'Endpoints',
              items: [
                { label: 'Overview', link: '/endpoints/' },
                { label: 'Donations', link: '/endpoints/donations/' },
                { label: 'Participants', link: '/endpoints/participants/' },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
```

Replace:

- `YOUR_GITHUB_USERNAME` with your GitHub username or organization name
- `YOUR_REPOSITORY_NAME` with this repository name

For this repository, the published URL would be:

```text
https://aminul007bd.github.io/app-docs/
```

If you use a custom domain, the `site` and `base` values may differ.

## Step 6: Add package scripts

Your `package.json` should include scripts like:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

Useful commands:

```bash
yarn dev
yarn build
```

## Step 7: Replace the GitHub Pages workflow

The current workflow uses Ruby and Jekyll. Replace it with a Node-based workflow.

Use this file for `.github/workflows/pages.yml`:

```yaml
name: Deploy Astro site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build site
        run: yarn build
        env:
          BASE_PATH: ${{ steps.pages.outputs.base_path }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

This workflow means:

- every push to `main` triggers a build
- the built Astro site is deployed to GitHub Pages
- the published site updates automatically after each commit lands in `main`

## Step 8: Make sure Astro uses the repository base path

GitHub Pages project sites are usually served from:

```text
https://USERNAME.github.io/REPOSITORY_NAME/
```

That means Astro must be configured with the correct `base` value.

Example:

```js
export default defineConfig({
  site: 'https://aminhoq.github.io',
  base: '/partner-docs',
});
```

If this is a user or organization root site instead of a project site, the base may be `/`.

## Step 9: Enable GitHub Pages deployment source

In the repository settings on GitHub:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`, choose `GitHub Actions`

This is required for the workflow-based deployment model.

## Step 10: Remove Ruby/Jekyll files after migration

Once Astro is working, you can remove the old Ruby-based files:

- `Gemfile`
- `Gemfile.lock`
- `_config.yml`
- `_includes/`

You should only delete them after confirming the Astro build and deployment are working.

## Yarn notes

Use Yarn consistently for local development and CI.

Expected files:

- `package.json`
- `yarn.lock`

Recommended local commands:

```bash
yarn install
yarn dev
yarn build
```

When GitHub Actions runs, it should install dependencies from `yarn.lock` so builds stay reproducible.

## Suggested migration order

1. Create the Astro Starlight project
2. Move the Markdown docs into `src/content/docs/`
3. Convert the front matter
4. Replace Jekyll callouts with Starlight admonitions
5. Configure the sidebar in `astro.config.mjs`
6. Add the Node-based GitHub Actions workflow
7. Push to `main`
8. Verify the published GitHub Pages site
9. Remove the old Ruby/Jekyll files

## Notes for this repository

- The current repo content is simple and should migrate cleanly.
- The current navigation metadata in Jekyll should be replaced by the Starlight sidebar.
- The current custom footer include will need to be recreated using Astro/Starlight customization if you still want it.
- The current 404 page should be reimplemented in Astro if you want a custom 404 page.

## Result

After this migration:

- you will use Node.js instead of Ruby
- you will keep writing documentation in Markdown
- GitHub Actions will build and deploy the site automatically
- every commit pushed to `main` will update the GitHub Pages site