import ReactGA from "react-ga4";

const gaId = import.meta.env.VITE_GA_ID;

export const initAnalytics = () => {
  if (!import.meta.env.PROD || !gaId) {
    return;
  }

  ReactGA.initialize(gaId);
};
