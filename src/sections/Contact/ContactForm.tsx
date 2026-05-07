import { useState } from "react";
import clsx from "clsx";
import { Button } from "../../components/ui/Button/Button";
import { TextInput } from "../../components/ui/TextInput/TextInput";
import { ContactConsentCheckbox } from "./ContactConsentCheckbox";
import {
  contactFormCopy,
  contactFormFields,
  statusMessages,
} from "./contact.data";
import {
  type ContactFormErrors,
  type ContactFormValues,
  contactFullNameMaxLength,
  formatPolishPhoneForSubmit,
  formatPolishPhoneInput,
  initialContactFormValues,
  validateContactForm,
} from "./contact.validation";
import style from "./Contact.module.scss";

type FormStatus = "idle" | "success" | "error" | "loading";
const apiUrl = import.meta.env.VITE_API_URL;

export const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(
    initialContactFormValues,
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      if (!apiUrl) {
        setStatus("error");
        return;
      }
      setStatus("loading");

      const payload = {
        ...values,
        phone: formatPolishPhoneForSubmit(String(values.phone)),
      };

      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: { ok: boolean; message: string } = await res.json();

      if (res.ok && data.ok) {
        setValues(initialContactFormValues);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit} noValidate>
      <div className={style.formFields}>
        {contactFormFields.map((field) => {
          const fieldName = field.name as keyof Omit<
            ContactFormValues,
            "consent"
          >;

          return (
            <TextInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              multiline={field.multiline}
              maxLength={
                field.name === "fullName" ? contactFullNameMaxLength : undefined
              }
              value={values[fieldName]}
              errorText={errors[fieldName]}
              onChange={(event) => {
                setStatus("idle");
                const nextValue =
                  field.name === "phone"
                    ? formatPolishPhoneInput(event.currentTarget.value)
                    : field.name === "vin"
                      ? event.currentTarget.value.toUpperCase()
                      : event.currentTarget.value;

                setValues((currentValues) => ({
                  ...currentValues,
                  [field.name]: nextValue,
                }));

                setErrors((currentErrors) => ({
                  ...currentErrors,
                  [field.name]: undefined,
                }));
              }}
            />
          );
        })}
      </div>

      <ContactConsentCheckbox
        checked={values.consent}
        error={errors.consent}
        onToggle={() => {
          setStatus("idle");
          setValues((currentValues) => ({
            ...currentValues,
            consent: !currentValues.consent,
          }));

          setErrors((currentErrors) => ({
            ...currentErrors,
            consent: undefined,
          }));
        }}
      />

      <div className={style.submitGroup}>
        <p className={style.requiredNote}>{contactFormCopy.requiredNote}</p>
        <div className={style.submitRow}>
          <Button
            type="submit"
            variant="primary"
            text={contactFormCopy.submit}
            iconName="arrow-right"
            disabled={status === "loading"}
          />
          {status !== "idle" && (
            <p
              className={clsx(
                style.submitMessage,
                status === "success" && style.submitMessageSuccess,
                status === "error" && style.submitMessageError,
              )}
              aria-live="polite"
            >
              {statusMessages[status]}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
