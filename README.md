# CLIECY Portfolio

Static portfolio and writing site for [cliecy.github.io](https://cliecy.github.io), built with Astro and file-based content collections. The interface defaults to Chinese and includes a persistent English switch; article content remains in its original language.

## Local development

Node 24 and npm are required. The repository includes an `.nvmrc`:

```sh
nvm use
npm ci
npm run dev
```

The main verification commands are:

```sh
npm run validate:content
npm run check
npm run test:unit
npm run build
npm run test:e2e
```

`npm run build` validates content, runs Astro's strict checker, runs unit tests, generates the static site, and optimizes image copies in `dist/`. Repository originals are never rewritten.

## Content

Blog posts live in `src/content/blog/<slug>.md`. Project entries live in `src/content/projects/<slug>.md`. The filename is the stable URL segment and published filenames must use lowercase ASCII kebab-case.

New posts should start as drafts:

```yaml
---
title: A clear title
description: A concise summary required before publishing.
pubDate: 2026-08-18
draft: true
tags: []
lang: en
---
```

Supported languages are `en`, `ja`, and `zh-CN`. A published post must also have no level-one heading in its body, and every Markdown image must have non-empty alt text. Local images belong in `public/images/blog/` or `public/images/projects/`, use absolute paths such as `/images/blog/example.webp`, and must be at most 10 MiB.

Development mode includes draft article routes and marks them visibly. Production builds exclude drafts from routes, home, lists, language and tag pages, RSS, and sitemap output.

## Pages CMS

The hosted Pages CMS reads `.pages.yml` from the selected repository branch. After this migration is merged:

1. Install the Pages CMS GitHub App for this repository only.
2. Open the `main` branch in Pages CMS.
3. Create a post with a lowercase kebab-case filename; the form defaults to `draft: true` and disables later renaming.
4. Upload images through the rich-text editor or cover field. Uploads are safely renamed and stored under `public/images/blog/`.
5. Save and confirm the commit lands on `main` and the Pages workflow succeeds. The draft must remain absent from the public site.
6. Add the required summary and image alt text, switch Draft off, and save again. The next deployment publishes the article and its language/tag/RSS/sitemap entries.

The same Markdown files can be edited and committed locally. There is no site-hosted `/admin` route or separate content database.

## Deployment and rollback

`.github/workflows/deploy.yml` deploys pushes to `main` with the official Astro and GitHub Pages actions on Node 24. Pull requests run the production build plus Playwright and axe checks.

Before the first deployment, set the repository's Pages source to **GitHub Actions**. Keep the existing `gh-pages` branch during the initial rollout. To roll back a broken cutover, switch the Pages source back to that branch. To roll back a bad CMS edit, revert its content commit on `main`; the deployment workflow will rebuild automatically.
