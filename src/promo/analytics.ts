type PhoneLocation =
  | "floating_button"
  | "header"
  | "mobile_menu"
  | "contact"
  | "footer"
  | "other";

type ClarityCommand = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    clarity?: ClarityCommand;
  }
}

const gtmId = import.meta.env.VITE_GTM_ID?.trim();
const clarityId = import.meta.env.VITE_CLARITY_ID?.trim();
let hasConsent = false;
let isInitialized = false;

export const initPromoAnalytics = () => {
  if (!import.meta.env.PROD || isInitialized) return;
  isInitialized = true;
  hasConsent = true;

  if (gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId)) {
    window.dataLayer ??= [];
    const consent: (...args: unknown[]) => void = function () {
      // Google's command queue expects Arguments, unlike ordinary event objects.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    consent("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.append(script);
  }

  if (clarityId && /^[a-z0-9]+$/i.test(clarityId)) {
    window.clarity ??= Object.assign(
      (...args: unknown[]) => {
        window.clarity?.q?.push(args);
      },
      { q: [] as unknown[][] },
    );
    window.clarity("consentv2", {
      analytics_Storage: "granted",
      ad_Storage: "denied",
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityId}`;
    document.head.append(script);
  }
};

const pushEvent = (event: string, params: Record<string, string>) => {
  if (!hasConsent || !gtmId || !/^GTM-[A-Z0-9]+$/.test(gtmId)) return;
  window.dataLayer?.push({ event, ...params });
};

export const trackPromoCallbackSuccess = () => {
  pushEvent("callback_form_submit", {
    status: "success",
    location: "callback_form",
  });
};

const getPhoneLocation = (link: Element): PhoneLocation => {
  if (link.closest('[data-promo-phone="floating_button"]'))
    return "floating_button";
  if (link.closest("#mobile-menu")) return "mobile_menu";
  if (link.closest("header")) return "header";
  if (link.closest("#contact")) return "contact";
  if (link.closest("footer")) return "footer";
  return "other";
};

export const bindPromoPhoneTracking = () => {
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!link?.getAttribute("href")?.trim().toLowerCase().startsWith("tel:"))
      return;
    pushEvent("phone_click", {
      method: "phone",
      location: getPhoneLocation(link),
    });
  };

  // Capture before the mobile menu can close; never delay or prevent the call.
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
};
