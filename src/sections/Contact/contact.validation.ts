import { contactFormCopy } from "./contact.data";

export type ContactFormValues = {
  fullName: string;
  phone: string;
  vin: string;
  message: string;
  consent: boolean;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const initialContactFormValues: ContactFormValues = {
  fullName: "",
  phone: "",
  vin: "",
  message: "",
  consent: false,
};

const forbiddenVinCharsPattern = /[IOQ]/i;
const vinAllowedCharsPattern = /^[A-HJ-NPR-Z0-9]+$/i;
const phonePattern = /^[+0-9\s()-]{7,20}$/;

export const validateContactForm = (formValues: ContactFormValues) => {
  const nextErrors: ContactFormErrors = {};
  const vin = formValues.vin.trim().toUpperCase();

  if (!formValues.fullName.trim()) {
    nextErrors.fullName = contactFormCopy.errors.fullName;
  }

  if (!formValues.phone.trim()) {
    nextErrors.phone = contactFormCopy.errors.phone;
  } else if (!phonePattern.test(formValues.phone.trim())) {
    nextErrors.phone = contactFormCopy.errors.phoneFormat;
  }

  if (!vin) {
    nextErrors.vin = contactFormCopy.errors.vin;
  } else if (vin.length !== 17) {
    nextErrors.vin = contactFormCopy.errors.vinLength;
  } else if (
    forbiddenVinCharsPattern.test(vin) ||
    !vinAllowedCharsPattern.test(vin)
  ) {
    nextErrors.vin = contactFormCopy.errors.vinFormat;
  }

  if (!formValues.message.trim()) {
    nextErrors.message = contactFormCopy.errors.message;
  }

  if (!formValues.consent) {
    nextErrors.consent = contactFormCopy.errors.consent;
  }

  return nextErrors;
};
