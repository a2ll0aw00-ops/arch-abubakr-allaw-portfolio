# Abubakr Allaw Portfolio — Sanity CMS

This React/Vite website continues the supplied `portfoliocms` source archive. It retains the existing portfolio design, bilingual site content, local fallback data, and the existing Sanity project. It was imported into a separate Manus WebDev resource because the original WebDev project could not be attached in this session; the previous project and Sanity data were not modified.

## Architecture

- The public website reads **published, read-only** documents from the existing Sanity project (`0nta1uyv`, dataset `production`). No Sanity write token is included in the browser code.
- Editing and publishing content happens in the authenticated [Sanity Studio](https://www.sanity.io/@o7xiunk7b/studio/msmk10yc34zodj3v86vez1on).
- Local content in `src/data/` remains the fallback when CMS data is unavailable. After publishing CMS changes, reload the site to fetch the published version.
- The app uses React Router `BrowserRouter`; pages use direct routes such as `/projects`, `/services`, and `/cv`.

## Content management

Use [Sanity Studio](https://www.sanity.io/@o7xiunk7b/studio/msmk10yc34zodj3v86vez1on) to manage the bilingual text groups, projects and image galleries, services and packages, profile, logo and hero background, SEO fields, and social links. The CV is organized under the existing `profileContent` document. See [ADMIN-GUIDE.md](ADMIN-GUIDE.md) for field-by-field instructions. Publishing a document in Sanity makes its data readable by the site; code changes must still be deployed to the website host.

## Development

Use Node.js 20 or newer from the project root:

```bash
npm ci
npm run dev
```

Vite listens on port `3000` for Manus Preview. To verify a production build:

```bash
npm run typecheck
npm run build
npm run preview
```

The production bundle is written to `dist/`. The current source passed `npm run typecheck` and `npm run build` after import into WebDev.

## Project map

- `src/hooks/index.ts`: Sanity read queries and mapping of CMS records to the website's data models.
- `src/lib/sanity.ts`: public read-only Sanity query client.
- `src/i18n/I18nContext.tsx`: Arabic/English language support and local text fallback.
- `src/data/content.ts` and `src/data/siteMedia.ts`: original local fallback content and images.
- `src/pages/` and `src/components/`: existing portfolio pages and presentation.
- `public/manus-routes.json`: the direct page-route manifest.
- `plan.md`, `TODO.md`, and `ADMIN-GUIDE.md`: implementation plan, completion state, and CMS instructions.

## Current CMS content and owner inputs

The published dataset currently contains six visible projects, each with three gallery URLs, and four visible services. The four service records do not currently contain an Upwork URL, starting price, currency, or packages, so the website uses its contact call-to-action until those values are supplied. Some Studio fields may be empty until their owner-provided values are entered and published.

A red validation marker was visible on the draft slug for `sample-1` in Sanity Studio. Its published slug is valid and unique; leave the published slug unchanged until the draft warning is reviewed in Studio.

Existing portfolio images include illustrative architectural visuals and should be replaced with the owner's actual project images, or clearly identified as concepts, before using the site as a public portfolio.

## Deployment and handoff status

The public website is served from Netlify at <https://arch-abubakrallaw.netlify.app/>. Sanity Studio is a separate hosted interface. Publishing Sanity content and deploying site or Studio code are separate operations; deploy the appropriate codebase when its schema or interface changes.
