import { useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import { TextInput } from "../../components/ui/TextInput/TextInput";
import { ContactConsentCheckbox } from "./ContactConsentCheckbox";
import { contactFormCopy, contactFormFields } from "./contact.data";
import {
  type ContactFormErrors,
  type ContactFormValues,
  initialContactFormValues,
  validateContactForm,
} from "./contact.validation";
import style from "./Contact.module.scss";

export const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(
    initialContactFormValues,
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
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
              value={values[fieldName]}
              errorText={errors[fieldName]}
              onChange={(event) => {
                const nextValue =
                  field.name === "vin"
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
        <Button
          variant="primary"
          text={contactFormCopy.submit}
          iconName="arrow-right"
        />
      </div>
    </form>
  );
};
