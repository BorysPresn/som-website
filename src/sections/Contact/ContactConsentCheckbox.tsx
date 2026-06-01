import clsx from "clsx";
import { privacyPolicyUrl } from "../../app/site.data";
import { contactFormCopy } from "./contact.data";
import style from "./Contact.module.scss";

type ContactConsentCheckboxProps = {
  checked: boolean;
  error?: string;
  onToggle: () => void;
};

export const ContactConsentCheckbox = ({
  checked,
  error,
  onToggle,
}: ContactConsentCheckboxProps) => {
  const labelId = "contact-consent-label";
  const errorId = error ? "contact-consent-error" : undefined;

  return (
    <>
      <div className={clsx(style.consent, error && style.consentError)}>
        <label className={style.consentLabel} htmlFor="contact-consent">
          <input
            id="contact-consent"
            className={style.consentCheckbox}
            type="checkbox"
            checked={checked}
            aria-invalid={Boolean(error)}
            aria-labelledby={labelId}
            aria-describedby={errorId}
            onChange={onToggle}
          />
          <span
            className={clsx(
              style.consentCheckboxVisual,
              checked && style.consentCheckboxChecked,
            )}
            aria-hidden="true"
          />
          <span id={labelId} className={style.consentText}>
            {contactFormCopy.consent.before}
          </span>
          <a className={style.consentLink} href={privacyPolicyUrl}>
            {contactFormCopy.consent.link}
          </a>
          .
        </label>
      </div>

      {error && (
        <p id={errorId} className={style.consentMessage}>
          {error}
        </p>
      )}
    </>
  );
};
