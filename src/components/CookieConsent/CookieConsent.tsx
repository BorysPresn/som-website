import { useEffect, useState } from "react";
import { initAnalytics } from "../../app/analytics";
import { privacyPolicyUrl } from "../../app/site.data";
import style from "./CookieConsent.module.scss";

const consentStorageKey = "som_cookie_consent";

type CookieConsentValue = "accepted" | "rejected";

const getStoredConsent = (): CookieConsentValue | null => {
  const value = (() => {
    try {
      return window.localStorage.getItem(consentStorageKey);
    } catch {
      return null;
    }
  })();

  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
};

export const CookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsentValue | null>(() =>
    getStoredConsent(),
  );

  useEffect(() => {
    if (consent === "accepted") {
      initAnalytics();
    }
  }, [consent]);

  const handleConsent = (value: CookieConsentValue) => {
    try {
      window.localStorage.setItem(consentStorageKey, value);
    } catch {
      // Consent still applies for the current page session if storage is blocked.
    }

    setConsent(value);
  };

  if (consent) {
    return null;
  }

  return (
    <section className={style.banner} aria-label="Informacja o cookies">
      <p className={style.text}>
        Używamy plików cookies analitycznych, aby sprawdzać, jak użytkownicy
        korzystają ze strony i poprawiać jej działanie. Więcej informacji:
        <a className={style.link} href={privacyPolicyUrl}>
          polityka prywatności
        </a>
        .
      </p>
      <div className={style.actions}>
        <button
          className={style.secondaryButton}
          type="button"
          onClick={() => handleConsent("rejected")}
        >
          Odrzucam
        </button>
        <button
          className={style.primaryButton}
          type="button"
          onClick={() => handleConsent("accepted")}
        >
          Akceptuję
        </button>
      </div>
    </section>
  );
};
