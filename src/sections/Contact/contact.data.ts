export const contactCopy = {
  eyebrow: "KONTAKT",
  title: "Um\u00F3w wizyt\u0119 lub wy\u015Blij zapytanie",
  description:
    "Masz pytanie lub chcesz um\u00F3wi\u0107 termin? Skontaktuj si\u0119 z nami w wybrany spos\u00F3b - szybko odpowiemy i ustalimy dogodny termin wizyty.",
};

export const contactMap = {
  title: "Mapa dojazdu do S.O.M. Serwis",
  src: "https://www.google.com/maps?q=ul.%20Szparagowa%208%2C%2062-081%20Wysogotowo&output=embed",
};

export const contactDetails = [
  {
    label: "Telefon:",
    value: "+48 793 545 208",
    href: "tel:+48793545208",
  },
  {
    label: "E-mail:",
    value: "autoserwis.som@gmail.com",
    href: "mailto:autoserwis.som@gmail.com",
  },
  {
    label: "Adres:",
    value: "ul. Szparagowa 8, 62-081 Wysogotowo",
  },
];

export const contactFormCopy = {
  consent:
    "Wyra\u017Cam zgod\u0119 na przetwarzanie moich danych osobowych przez AUTO-SOM w celu kontaktu oraz realizacji zg\u0142oszenia, zgodnie z obowi\u0105zuj\u0105cymi przepisami i polityk\u0105 prywatno\u015Bci.",
  requiredNote: "* Pola obowi\u0105zkowe",
  submit: "Wy\u015Blij",
  errors: {
    fullName: "Wpisanie imienia i nazwiska jest wymagane.",
    fullNameLength: "Imi\u0119 i nazwisko nie mo\u017Ce przekracza\u0107 80 znak\u00F3w.",
    phone: "Wpisanie numeru telefonu jest wymagane.",
    phoneFormat: "Wpisz poprawny numer telefonu.",
    phoneCountry:
      "Formularz przyjmuje polskie numery telefonu. Je\u015Bli masz numer z innego kraju, napisz do nas przez Telegram lub e-mail.",
    vin: "Wpisanie numeru VIN jest wymagane.",
    vinLength: "Numer VIN musi mie\u0107 dok\u0142adnie 17 znak\u00F3w.",
    vinFormat:
      "Numer VIN mo\u017Ce zawiera\u0107 tylko litery A-Z i cyfry, bez I, O oraz Q.",
    message: "Opisanie problemu jest wymagane.",
    consent: "Zgoda na przetwarzanie danych jest wymagana.",
  },
};

export const contactFormFields = [
  {
    label: "Imi\u0119 i nazwisko*",
    name: "fullName",
    type: "text",
    placeholder: "Wpisz imi\u0119 i nazwisko",
    required: true,
  },
  {
    label: "Numer telefonu*",
    name: "phone",
    type: "tel",
    placeholder: "+48 123 456 789",
    required: true,
  },
  {
    label: "Numer VIN*",
    name: "vin",
    type: "text",
    placeholder: "Np. WAUZZZ8V4KA123456",
    required: true,
  },
  {
    label: "Wiadomo\u015B\u0107*",
    name: "message",
    placeholder: "Opisz problem...",
    multiline: true,
    required: true,
  },
];
