# S.O.M. Serwis Landing Page

Production landing page for S.O.M., an auto service workshop based in Poznan/Wysogotowo, Poland.

The project is a static React application focused on fast loading, local SEO, service presentation, Google reviews, contact conversion, and analytics for key user actions.

## Live

- Production: https://auto-som.pl/
- GitHub Pages preview: https://boryspresn.github.io/som-website/

## Status

The landing page is production-ready.

The core release is considered complete when:

- the production domain serves the React build;
- the contact form sends requests to the backend endpoint;
- Google Analytics records page views and key conversion events;
- `robots.txt` and `sitemap.xml` are available in production;
- GitHub Actions CI and deployment workflows pass;
- `npm run lint` and `npm run build` pass locally before release changes.

Future work should be treated as post-launch iteration: copy updates, SEO tuning, analytics review, backend/CRM improvements, performance audits, and content experiments.

## Tech Stack

- React 19
- TypeScript
- Vite
- SCSS modules
- ReactGA / GA4
- ESLint
- GitHub Actions
- GitHub Pages preview
- FTP deployment to LH.pl hosting

## Requirements

- Node.js 22
- npm

## Environment Variables

Local development can use `.env`:

```env
VITE_API_URL=https://example-backend.com
VITE_GA_ID=G-XXXXXXXXXX
```

`VITE_API_URL` is used by the contact form.

`VITE_GA_ID` is used by Google Analytics. Analytics is initialized only in production builds and only when this variable exists.

For GitHub Actions:

- `VITE_GA_ID` is stored as a repository variable: `Settings -> Secrets and variables -> Actions -> Variables`.
- FTP credentials are stored as repository secrets.

Required secrets for production FTP deployment:

```text
FTP_HOST
FTP_USER
FTP_PASSWORD
FTP_TARGET_DIR
```

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

The production site is deployed from the `main` branch to LH.pl hosting via FTP.

The production workflow:

```text
.github/workflows/deploy.yml
```

It runs:

- `npm ci`
- `npm run build`
- FTP upload of `dist/`

GitHub Pages is kept as a preview deployment:

```text
.github/workflows/pages.yml
```

The Pages workflow builds with:

```bash
BASE_PATH=/som-website/ npm run build
```

`vite.config.ts` reads `BASE_PATH` and falls back to `/` for local and production-domain builds.

## Advertising Version (In Development)

The advertising page has its own React entry point in `src/promo/main.tsx` and uses the `promo` Vite mode. It reuses the header, footer, hero, services, reviews, and contact layout without the main contact form.

```bash
npm run dev:promo
npm run build:promo
npm run preview:promo
```

The main build remains in `dist/`; the advertising build is written to `dist-promo/`. Promo has its own public directory, allows crawling, and includes a `noindex` directive. Its favicon and privacy policy links currently point to the main website.

The existing automatic deployment workflow still publishes only the main build. Promo navigation omits `O nas`, since the corresponding section is not included.

The popup submits `fullName`, a normalized Polish `phone` (`+48` followed by nine digits), and the `website` honeypot to `${VITE_API_URL}/api/callback`. It uses the shared contact validation, blocks concurrent submissions, and waits up to 15 seconds. Success requires an HTTP success response with `ok: true`. The backend sends requests to email and Telegram; acceptance by either channel is considered success. Closing the popup aborts the browser request but cannot undo a request already accepted by the server.

For local API testing, set `VITE_API_URL=http://localhost:3000` in the ignored `.env.promo.local` file and run the promo development mode. Vite environment values are embedded at build time; changing hosting settings without rebuilding does not update the API address.

### Promo Production Deployment

`.github/workflows/deploy-promo.yml` is a separate, manually triggered workflow restricted to `main`. It builds only `dist-promo/` with the Railway API address and uploads it using the existing FTP credentials. It does not run automatically on pushes and does not deploy the main build. Promo loads GTM after analytics consent and supports an optional Clarity project ID. Container configuration and live verification remain release requirements; see [Promo Analytics Contract](docs/promo-analytics.md).

Add the repository secret `FTP_PROMO_TARGET_DIR`: the exact FTP directory configured as the document root of `promo.auto-som.pl`, ending with `/`. Do not guess this path from the subdomain name. The workflow rejects empty, root, and overlapping main/promo directory paths. Keep both document roots separate, preferably as sibling directories. The check compares configured paths; the hosting configuration must also point each domain at its intended directory.

Promo release checklist:

- Create `promo.auto-som.pl` on LH.pl with a separate document root and a valid HTTPS certificate.
- Configure `FTP_PROMO_TARGET_DIR`; keep the existing `FTP_TARGET_DIR` unchanged.
- Deploy the backend callback branch to Railway and check startup logs.
- After that backend deploy, set `CLIENT_ORIGIN=https://auto-som.pl,https://promo.auto-som.pl` (or the preferred `CLIENT_ORIGINS` setting) and apply the configuration. Do not use the comma-separated value with the old backend code.
- Finish and verify consent-aware GTM/Clarity integration and the agreed form-success/phone-click events.
- Set the optional Actions variables `VITE_GTM_ID` and `VITE_CLARITY_ID` (the promo workflow defaults to the provided GTM container, but Clarity requires an ID).
- Run lint and both main/promo builds, merge the frontend changes, then manually run `Deploy promo frontend` from `main`.
- Check HTTPS, the promo `noindex` directive, assets, popup behavior, and mobile layout on the real subdomain.
- Submit one approved test request from promo and verify email and Telegram delivery. Check browser CORS and the existing main-site form as well.
- Confirm that the main site's content, canonical, sitemap, and deployment directory are unchanged.

GitHub Pages publishes the advertising demo at `https://boryspresn.github.io/som-website/promo/` alongside the main preview. The Pages workflow runs on `main` and `feat/promo-foundation`, builds promo with `BASE_PATH=/som-website/promo/`, and includes `dist-promo/` under `dist/promo/`. The visual demo has no API URL or analytics ID configured; callback submission is not enabled there.

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
    analytics.ts
    site.data.ts
    styles/
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

- Shared navigation, logo, CTA, and social data lives in `src/app/site.data.ts`.
- Section-specific copy lives close to its section, usually in `*.data.ts`.
- SVG icons live in `src/assets/icons` and are rendered through the shared `Icon` component.
- Images live in `src/assets/images`.
- Public static files live in `public`.
- `public/robots.txt` points crawlers to `public/sitemap.xml`.

## Contact Form

Backend source: [BorysPresn/tg_bot](https://github.com/BorysPresn/tg_bot).

The backend shares a repository with the Telegram bot. The website endpoint is implemented in `src/api/contact.routes.js`, with validation in `src/helpers/contactFormValidator.js`. Website submissions currently send email through Resend (`src/services/mail.sevices.js`); the HTTP handler does not send a Telegram notification.

The main API requires full name, a Polish phone number, VIN, message, and consent. Promo uses the separate `/api/callback` endpoint with name and phone, implemented in the backend `feat/callback-request` branch. The backend must be deployed and its allowed CORS origins updated before production promo submissions are enabled.

The contact form submits JSON to:

```text
${VITE_API_URL}/api/contact
```

Frontend validation covers:

- required full name;
- Polish phone number format;
- required VIN with VIN-specific character and length validation;
- required message;
- required consent checkbox.

The form includes a hidden honeypot field named `website`. If this field is filled, the frontend silently treats the submission as successful without calling the API. The backend should also ignore submissions where `website` is not empty.

Expected backend response:

```json
{
  "ok": true,
  "message": "Message sent"
}
```

## Analytics

Google Analytics 4 is initialized through `react-ga4` in:

```text
src/app/analytics.ts
```

Tracked events include:

- `cta_click`
- `contact_link_click`
- `contact_form_submit`
- `navigation_click`
- `social_link_click`
- `faq_open`
- `reviews_source_click`
- `service_card_click`

Recommended GA4 custom dimensions:

```text
method
location
status
service
question
```

Use GA4 Realtime and browser Network filters `gtag` / `collect` to verify analytics after deployment.

## Performance Notes

- Hero uses optimized WebP assets.
- Desktop hero slider images are loaded only for desktop viewports.
- Service card images are compressed and rendered as lazy `<img>` elements.
- Below-hero images include explicit dimensions and lazy/async loading attributes where appropriate.
- A deeper Lighthouse and Network audit can be handled as a post-launch performance pass.

## Development Guidelines

- Keep changes scoped by section or concern.
- Prefer existing shared primitives before adding new abstractions.
- Preserve mobile-first styling.
- Use semantic foundation variables for shared colors, spacing, and typography.
- Write new Polish copy directly in UTF-8. Existing escaped strings can stay as-is unless the file is already being edited.
- Use conventional commit messages: `feat:`, `fix:`, `refactor:`, `chore:`.
- Before opening a PR, run `npm run lint` and `npm run build`.

## Release Checklist

- `npm run lint`
- `npm run build`
- Production deploy workflow passed
- Production domain opens the new React build
- Contact form sends successfully
- GA4 Realtime receives `page_view`
- GA4 Realtime receives at least one custom event
- `https://auto-som.pl/robots.txt` is available
- `https://auto-som.pl/sitemap.xml` is available
