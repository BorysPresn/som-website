import dobryMechanikIcon from "../../assets/images/contact-methods/dobry-mechanik.png";
import mailIcon from "../../assets/images/contact-methods/mail.svg";
import phoneIcon from "../../assets/images/contact-methods/phone.svg";
import telegramIcon from "../../assets/images/contact-methods/telegram.svg";

export const contactMethodsCopy = {
  title: "Inne sposoby kontaktu",
};

type ContactMethod = {
  title: string;
  description: string;
  icon: string;
  iconVariant: "regular" | "wide";
  href?: string;
};

export const contactMethods: ContactMethod[] = [
  {
    title: "Zadzwo\u0144 do nas",
    description: "Zadzwo\u0144 i ustal dogodny termin wizyty.",
    icon: phoneIcon,
    iconVariant: "regular",
    href: "tel:+48793545208",
  },
  {
    title: "Telegram",
    description: "Skontaktuj si\u0119 z nami szybko przez Telegram bota.",
    icon: telegramIcon,
    iconVariant: "regular",
    href: "https://t.me/SerwisSOMbot",
  },
  {
    title: "Dobry Mechanik",
    description: "Zarezerwuj wizyt\u0119 online przez platform\u0119 Dobry Mechanik.",
    icon: dobryMechanikIcon,
    iconVariant: "wide",
    href: "https://dobrymechanik.pl/mechanicy/poznan/auto-serwis-s-o-m.html",
  },
  {
    title: "Napisz e-mail",
    description: "Wy\u015Blij wiadomo\u015B\u0107, odpowiemy jak najszybciej.",
    icon: mailIcon,
    iconVariant: "regular",
    href: "mailto:autoserwis.som@gmail.com",
  },
];
