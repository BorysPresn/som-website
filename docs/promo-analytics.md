# Promo Analytics Contract

Scope: advertising version only. The main site's GA4 implementation is unchanged.

## Loading And Consent

- GTM is loaded after the visitor accepts analytics cookies, including a stored acceptance on later visits. Without consent, no promo analytics scripts load and no events are queued for later replay.
- The main site's `react-ga4` initialization is not used by promo, even if `VITE_GA_ID` exists.
- Google consent defaults to analytics granted and advertising storage, advertising user data, and ad personalization denied when GTM loads. The current banner grants analytics, not advertising consent. Container tags must respect these settings.
- The application loads Clarity directly only if `VITE_CLARITY_ID` is provided. Do not also install Clarity in GTM. Clarity receives `consentv2` with analytics granted and advertising denied. The callback form is explicitly masked.
- Local development and the GitHub Pages visual demo do not load these integrations. Use a production-mode build to test them.
- No unconditional GTM `noscript` iframe is included, since it would bypass the current JavaScript-based consent gate.

## Build Configuration

GitHub repository Actions variables, not secrets:

| Variable | Value |
| --- | --- |
| `VITE_GTM_ID` | `GTM-M9TXM5GC` (provided container; also the promo workflow fallback) |
| `VITE_CLARITY_ID` | Project ID from Dima; leave unset until provided |

The IDs are public build configuration. Changing either requires rebuilding and redeploying promo. Do not put access tokens or private credentials in `VITE_*` variables.

## Events

Events are pushed to `window.dataLayer`; this does not itself send events to GA4 or Google Ads.

| Event | Parameters | When |
| --- | --- | --- |
| `phone_click` | `method: "phone"`, `location` | Activation of any `tel:` link, including nested phone icons |
| `callback_form_submit` | `status: "success"`, `location: "callback_form"` | API returns HTTP success and JSON `ok: true` |

Phone locations:

- `floating_button`: floating mobile call button.
- `header`: desktop header call button.
- `mobile_menu`: call button inside the mobile menu.
- `contact`: phone link in the contact section.
- `footer`: any phone link placed in the footer (there is currently none).
- `other`: another `tel:` link, if added later.

Phone clicks measure an intent to call, not a connected call. Form success means that the backend accepted delivery through at least one channel, not that the customer was contacted. Validation errors, request errors, popup openings, and honeypot submissions are not conversion events. No names, submitted phone numbers, email addresses, or form values are included in event parameters.

## GTM Handoff To The Advertiser

1. Verify the provided container belongs to this project and restrict its tags to the intended promo hostname.
2. Configure the Google tag with the intended GA4 property/destination. Its normal page views provide visitor/session measurement; the application does not send a second manual page view.
3. Create Custom Event triggers with exact names `phone_click` and `callback_form_submit`.
4. Create Data Layer Variables (version 2) named `method`, `location`, and `status`. Map only the parameters belonging to each event to the GA4 event tags.
5. For GA4 reporting, register event-scoped custom dimensions for the parameters that are needed. Conversion/key-event configuration and Google Ads linking/import are configured in those products, not by the frontend alone.
6. Do not add a second generic phone-click trigger or an automatic form-submit conversion on top of these custom events. An attempted submit is not an API-confirmed success.
7. Decide how advertising consent will be collected before enabling tags that require it. Do not override the analytics-only banner decision with blanket advertising consent.
8. Preview and publish the container after verification. Clarity is managed by the application, not an additional container tag.

## Verification

- `npm run test:promo`: mocked tests; no external analytics traffic or notifications.
- `npm run lint`, `npm run build`, and `npm run build:promo`.
- Fresh storage / rejection: no GTM or Clarity request, and no conversion events.
- Acceptance: one GTM script, optionally one Clarity script; no duplicate initialization.
- Click floating, header, mobile-menu, and contact phone links; check one `phone_click` and its location in GTM Preview. The telephone action must still work normally.
- With an approved test submission, check one `callback_form_submit` after API confirmation. Invalid input, honeypot, and API errors must not trigger it.
- Confirm tag delivery in GTM Preview / GA4 DebugView after the advertiser configures the container. Verify the original website's GA4 still works separately.

Until a Clarity project ID is supplied and the GTM container's tags are verified, analytics integration is not fully signed off for production.
