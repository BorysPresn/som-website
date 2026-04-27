import clsx from "clsx";
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
        <button
          className={clsx(
            style.consentCheckboxButton,
            checked && style.consentCheckboxChecked,
          )}
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-invalid={Boolean(error)}
          aria-labelledby={labelId}
          aria-describedby={errorId}
          onClick={onToggle}
        >
          <span className={style.consentCheckboxVisual} aria-hidden="true" />
        </button>
        <button
          id={labelId}
          className={style.consentTextButton}
          type="button"
          onClick={onToggle}
        >
          {contactFormCopy.consent}
        </button>
      </div>

      {error && (
        <p id={errorId} className={style.consentMessage}>
          {error}
        </p>
      )}
    </>
  );
};
