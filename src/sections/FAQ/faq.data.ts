import type { FaqQuestionSlug } from "../../app/analytics";

export const faqCopy = {
  eyebrow: "FAQ",
  title: "Najcz\u0119\u015Bciej zadawane pytania",
};

export const faqItems = [
  {
    analyticsId: "bez_zapisu",
    question: "Czy mo\u017Cna przyjecha\u0107 bez wcze\u015Bniejszego zapisu?",
    answer:
      "W wielu przypadkach tak, ale najlepiej skontaktowa\u0107 si\u0119 wcze\u015Bniej \u2014 sprawdzimy dost\u0119pno\u015B\u0107 i zaproponujemy najbli\u017Cszy mo\u017Cliwy termin.",
  },
  {
    analyticsId: "umowienie_wizyty",
    question: "Jak um\u00F3wi\u0107 wizyt\u0119?",
    answer:
      "Mo\u017Cesz zadzwoni\u0107 do nas, skorzysta\u0107 z formularza kontaktowego, napisa\u0107 przez bota Telegram lub zarezerwowa\u0107 termin przez Dobry Mechanik.",
  },
  {
    analyticsId: "czas_diagnostyki",
    question: "Ile trwa diagnostyka samochodu?",
    answer:
      "Podstawowa diagnostyka zwykle zajmuje od kilkudziesi\u0119ciu minut do kilku godzin. Przy bardziej z\u0142o\u017Conych usterkach informujemy o dalszych krokach i czasie naprawy.",
  },
  {
    analyticsId: "wycena",
    question: "Czy przed napraw\u0105 otrzymam wycen\u0119?",
    answer:
      "Tak. Przed rozpocz\u0119ciem prac przedstawiamy zakres i orientacyjny koszt. Je\u015Bli w trakcie pojawi\u0105 si\u0119 dodatkowe usterki \u2014 kontaktujemy si\u0119 przed wykonaniem kolejnych prac.",
  },
  {
    analyticsId: "czesci",
    question: "Czy u\u017Cywacie oryginalnych cz\u0119\u015Bci?",
    answer:
      "Dobieramy cz\u0119\u015Bci do auta i bud\u017Cetu klienta. Pracujemy na cz\u0119\u015Bciach oryginalnych lub sprawdzonych zamiennikach dobrej jako\u015Bci.",
  },
  {
    analyticsId: "gwarancja",
    question: "Czy oferujecie gwarancj\u0119 na wykonane us\u0142ugi?",
    answer:
      "Tak. Na wykonane us\u0142ugi udzielamy gwarancji. Je\u015Bli problem wynika z b\u0142\u0119du po naszej stronie \u2014 usuwamy usterk\u0119 na koszt firmy.",
  },
] satisfies Array<{
  analyticsId: FaqQuestionSlug;
  question: string;
  answer: string;
}>;
