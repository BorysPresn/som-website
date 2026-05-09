import ReactGA from "react-ga4";

const gaId = import.meta.env.VITE_GA_ID;
let isAnalyticsEnabled = false;

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export const initAnalytics = () => {
  if (!import.meta.env.PROD || !gaId) {
    return;
  }

  ReactGA.initialize(gaId);
  isAnalyticsEnabled = true;
};

export const trackAnalyticsEvent = (
  eventName: string,
  params?: AnalyticsEventParams,
) => {
  if (!isAnalyticsEnabled) {
    return;
  }

  ReactGA.event(eventName, params);
};

export const trackCtaClick = (location: string) => {
  trackAnalyticsEvent("cta_click", { location });
};

export const trackContactLinkClick = (method: string, location: string) => {
  trackAnalyticsEvent("contact_link_click", { method, location });
};

export const trackFormSubmit = (status: "success" | "error") => {
  trackAnalyticsEvent("contact_form_submit", { status });
};

export const trackNavigationClick = (label: string, location: string) => {
  trackAnalyticsEvent("navigation_click", { label, location });
};
