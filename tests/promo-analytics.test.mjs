import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/promo/analytics.ts", import.meta.url),
  "utf8",
);
// Supply Vite's build-time environment without loading real analytics scripts.
const { outputText } = ts.transpileModule(
  source.replaceAll("import.meta.env", "testEnv"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2023,
    },
  },
);

function setup(env = {}) {
  const scripts = [];
  const listeners = new Set();
  class Element {
    constructor(href, selectors = []) {
      this.href = href;
      this.selectors = selectors;
    }
    closest(selector) {
      return selector === "a[href]" || this.selectors.includes(selector)
        ? this
        : null;
    }
    getAttribute(name) {
      return name === "href" ? this.href : null;
    }
  }
  const window = {};
  const context = vm.createContext({
    exports: {},
    testEnv: { PROD: true, VITE_GTM_ID: "GTM-TEST123", ...env },
    window,
    Element,
    document: {
      head: { append: (script) => scripts.push(script) },
      createElement: () => ({}),
      addEventListener: (_, handler) => listeners.add(handler),
      removeEventListener: (_, handler) => listeners.delete(handler),
    },
  });
  vm.runInContext(outputText, context);
  return {
    ...context.exports,
    window,
    scripts,
    click(href, selectors) {
      const target = new Element(href, selectors);
      // Model a nested icon, so tracking must use closest() rather than href on target.
      const icon = new Element();
      icon.closest = (selector) => target.closest(selector);
      for (const handler of listeners) handler({ target: icon });
    },
    events() {
      return JSON.parse(JSON.stringify(window.dataLayer ?? [])).filter(
        (entry) => entry.event && entry.event !== "gtm.js",
      );
    },
  };
}

test("no scripts or conversion events before acceptance", () => {
  const analytics = setup();
  analytics.bindPromoPhoneTracking();
  analytics.click("tel:+48111222333", ["header"]);
  analytics.trackPromoCallbackSuccess();
  assert.equal(analytics.scripts.length, 0);
  assert.deepEqual(analytics.events(), []);
});

test("acceptance loads GTM once and keeps advertising consent denied", () => {
  const analytics = setup();
  analytics.initPromoAnalytics();
  analytics.initPromoAnalytics();
  assert.equal(analytics.scripts.length, 1);
  assert.equal(
    analytics.scripts[0].src,
    "https://www.googletagmanager.com/gtm.js?id=GTM-TEST123",
  );
  const consent = analytics.window.dataLayer[0];
  assert.equal(consent[0], "consent");
  assert.equal(consent[2].analytics_storage, "granted");
  assert.equal(consent[2].ad_storage, "denied");
});

test("tracks every phone location once, including clicks on nested icons", () => {
  const analytics = setup();
  analytics.initPromoAnalytics();
  const cleanup = analytics.bindPromoPhoneTracking();
  const locations = [
    ["floating_button", '[data-promo-phone="floating_button"]'],
    ["mobile_menu", "#mobile-menu"],
    ["header", "header"],
    ["contact", "#contact"],
    ["footer", "footer"],
    ["other", "main"],
  ];
  for (const [, selector] of locations)
    analytics.click("tel:+48111222333", [selector]);
  assert.deepEqual(
    analytics.events(),
    locations.map(([location]) => ({
      event: "phone_click",
      method: "phone",
      location,
    })),
  );
  cleanup();
  analytics.click("tel:+48111222333", ["header"]);
  assert.equal(analytics.events().length, locations.length);
});

test("ignores non-phone links and sends only the callback success contract", () => {
  const analytics = setup();
  analytics.initPromoAnalytics();
  analytics.bindPromoPhoneTracking();
  analytics.click("mailto:private@example.com", ["#contact"]);
  analytics.click("#services", ["header"]);
  analytics.trackPromoCallbackSuccess();
  assert.deepEqual(analytics.events(), [
    {
      event: "callback_form_submit",
      status: "success",
      location: "callback_form",
    },
  ]);
});

test("does not load analytics in development or when IDs are absent/invalid", () => {
  for (const env of [
    { PROD: false },
    { VITE_GTM_ID: "" },
    { VITE_GTM_ID: "invalid" },
  ]) {
    const analytics = setup(env);
    analytics.initPromoAnalytics();
    analytics.trackPromoCallbackSuccess();
    assert.equal(analytics.scripts.length, 0);
    assert.deepEqual(analytics.events(), []);
  }
});

test("Clarity is optional and receives analytics-only consent after acceptance", () => {
  const analytics = setup({ VITE_CLARITY_ID: "test123" });
  assert.equal(analytics.window.clarity, undefined);
  analytics.initPromoAnalytics();
  analytics.initPromoAnalytics();
  assert.equal(analytics.scripts.length, 2);
  assert.equal(analytics.scripts[1].src, "https://www.clarity.ms/tag/test123");
  const [command, consent] = analytics.window.clarity.q[0];
  assert.equal(command, "consentv2");
  assert.equal(consent.analytics_Storage, "granted");
  assert.equal(consent.ad_Storage, "denied");
});
