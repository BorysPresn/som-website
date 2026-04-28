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
export const contactFullNameMaxLength = 80;
const contactPhoneConfig = {
  countryCode: "48",
  localDigitsLength: 9,
};

const getPhoneDigits = (phone: string) => phone.replace(/\D/g, "");

const hasUnsupportedPhoneCountryCode = (phone: string) => {
  const digits = getPhoneDigits(phone);
  const trimmedPhone = phone.trim();
  const { countryCode, localDigitsLength } = contactPhoneConfig;

  return (
    (trimmedPhone.startsWith("+") && !trimmedPhone.startsWith(`+${countryCode}`)) ||
    (digits.length > localDigitsLength && !digits.startsWith(countryCode))
  );
};

export const getPolishLocalPhoneDigits = (phone: string) => {
  const digits = getPhoneDigits(phone);
  const trimmedPhone = phone.trim();
  const { countryCode, localDigitsLength } = contactPhoneConfig;
  const hasCountryCode =
    trimmedPhone.startsWith(`+${countryCode}`) ||
    (digits.length > localDigitsLength && digits.startsWith(countryCode));

  if (hasCountryCode) {
    return digits.slice(countryCode.length, countryCode.length + localDigitsLength);
  }

  return digits.slice(0, localDigitsLength);
};

export const formatPolishPhoneInput = (phone: string) => {
  if (hasUnsupportedPhoneCountryCode(phone)) {
    return phone;
  }

  const localDigits = getPolishLocalPhoneDigits(phone);

  if (!localDigits) {
    return "";
  }

  const phoneParts = localDigits.match(/\d{1,3}(?=(\d{3})*$)/g) ?? [];

  return `+${contactPhoneConfig.countryCode} ${phoneParts.join(" ")}`;
};

export const formatPolishPhoneForSubmit = (phone: string) => {
  const localDigits = getPolishLocalPhoneDigits(phone);

  return localDigits.length === contactPhoneConfig.localDigitsLength
    ? `+${contactPhoneConfig.countryCode}${localDigits}`
    : phone;
};

export const validateContactForm = (formValues: ContactFormValues) => {
  const nextErrors: ContactFormErrors = {};
  const vin = formValues.vin.trim().toUpperCase();

  if (!formValues.fullName.trim()) {
    nextErrors.fullName = contactFormCopy.errors.fullName;
  } else if (formValues.fullName.trim().length > contactFullNameMaxLength) {
    nextErrors.fullName = contactFormCopy.errors.fullNameLength;
  }

  const phoneDigits = getPhoneDigits(formValues.phone);
  const localPhoneDigits = getPolishLocalPhoneDigits(formValues.phone);

  if (!phoneDigits) {
    nextErrors.phone = contactFormCopy.errors.phone;
  } else if (hasUnsupportedPhoneCountryCode(formValues.phone)) {
    nextErrors.phone = contactFormCopy.errors.phoneCountry;
  } else if (localPhoneDigits.length !== contactPhoneConfig.localDigitsLength) {
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
