# S.O.M. Serwis Landing Page

Production landing page for S.O.M., an auto service workshop based in Poznan/Wysogotowo, Poland.

The project is a static React application focused on fast loading, clear service presentation, local SEO, reviews, and contact conversion.

## Live

https://boryspresn.github.io/som-website/

## Tech Stack

- React 19
- TypeScript
- Vite
- SCSS modules
- ESLint
- GitHub Actions
- GitHub Pages deployment

## Requirements

- Node.js 22
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The site is deployed with GitHub Pages from the `main` branch.

The Pages workflow builds the app with:

```bash
BASE_PATH=/som-website/ npm run build
```

`vite.config.ts` reads `BASE_PATH` and falls back to `/` for local builds.

## CI

GitHub Actions runs:

- `npm ci`
- `npm run lint`
- `npm run build`

CI runs on pull requests and pushes to `main`.

## Project Structure

```text
src/
  app/
    styles/
    site.data.ts
  assets/
    icons/
    images/
  components/
    layout/
    ui/
  sections/
    About/
    Contact/
    FAQ/
    Footer/
    Header/
    Hero/
    Owner/
    Process/
    Reviews/
    Services/
    TopBar/
  types/
  App.tsx
  main.tsx
```

## Content And Assets

- Shared site data lives in `src/app/site.data.ts`.
- Section-specific copy lives close to its section, usually in `*.data.ts`.
- SVG icons live in `src/assets/icons` and are rendered through the shared `Icon` component.
- Images live in `src/assets/images`.
- Public static files live in `public`.

## Performance Notes

- Hero uses optimized WebP assets.
- Desktop hero slider images are loaded only for desktop viewports.
- Service card images are compressed and rendered as lazy `<img>` elements.
- Below-hero images include explicit dimensions and lazy/async loading attributes where appropriate.

## Development Guidelines

- Keep changes scoped by section or concern.
- Prefer existing shared primitives before adding new abstractions.
- Preserve mobile-first styling.
- Use semantic foundation variables for colors, spacing, and typography when a style is shared.
- Write new Polish copy directly in UTF-8. Existing escaped strings can stay as-is unless the file is already being edited.
- Before opening a PR, run `npm run lint` and `npm run build`.

## Status

Production-ready landing page with ongoing small SEO, content, and performance refinements.
