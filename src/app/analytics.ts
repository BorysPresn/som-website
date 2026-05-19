import ReactGA from "react-ga4";

const gaId = import.meta.env.VITE_GA_ID;
let isAnalyticsEnabled = false;

export type CtaLabel = "umow_termin" | "umow_wizyte" | "kontakt";
export type CtaLocation =
  | "hero"
  | "services"
  | "about"
  | "process"
  | "reviews"
  | "faq"
  | "footer";
export type ContactMethod = "phone" | "telegram" | "email" | "dobry_mechanik";
export type ContactLocation =
  | "topbar"
  | "header"
  | "contact_details"
  | "contact_methods"
  | "footer";
export type FormStatus = "success" | "error";
export type ServiceSlug =
  | "geometria_kol_3d"
  | "wymiana_opon"
  | "mechanika_pojazdowa"
  | "chip_tuning"
  | "elektronika_samochodowa"
  | "naprawa_zawieszenia"
  | "klimatyzacja"
  | "regeneracja_przekladni_kierowniczych"
  | "dodatkowe_uslugi";
export type FaqQuestionSlug =
  | "bez_zapisu"
  | "umowienie_wizyty"
  | "czas_diagnostyki"
  | "wycena"
  | "czesci"
  | "gwarancja";
export type NavigationTarget = "services" | "about" | "reviews" | "contact";
export type NavigationLocation = "desktop_menu" | "mobile_menu" | "footer_menu";
export type SectionSlug =
  | "hero"
  | "services"
  | "about"
  | "process"
  | "reviews"
  | "owner"
  | "faq"
  | "contact";

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export const initAnalytics = () => {
  if (!import.meta.env.PROD || !gaId) {
    return;
  }

  ReactGA.initialize(gaId);
  isAnalyticsEnabled = true;
};

const trackAnalyticsEvent = (
  eventName: string,
  params?: AnalyticsEventParams,
) => {
  if (!isAnalyticsEnabled) {
    return;
  }

  ReactGA.event(eventName, params);
};

export const trackCtaClick = (params: {
  label: CtaLabel;
  location: CtaLocation;
}) => {
  trackAnalyticsEvent("cta_click", params);
};

export const trackContactLinkClick = (params: {
  method: ContactMethod;
  location: ContactLocation;
}) => {
  trackAnalyticsEvent("contact_link_click", params);
};

export const trackFormSubmit = (params: {
  status: FormStatus;
  location: "contact_form";
}) => {
  trackAnalyticsEvent("form_submit", params);
};

export const trackServiceCardClick = (params: {
  service: ServiceSlug;
  location: "services";
}) => {
  trackAnalyticsEvent("service_card_click", params);
};

export const trackFaqOpen = (params: {
  question: FaqQuestionSlug;
  location: "faq";
}) => {
  trackAnalyticsEvent("faq_open", params);
};

export const trackNavigationClick = (params: {
  target: NavigationTarget;
  location: NavigationLocation;
}) => {
  trackAnalyticsEvent("navigation_click", params);
};

export const trackSectionView = (params: { section: SectionSlug }) => {
  trackAnalyticsEvent("section_view", params);
};
