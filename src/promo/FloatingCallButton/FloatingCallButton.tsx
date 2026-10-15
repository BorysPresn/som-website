import PhoneIcon from "../../assets/images/contact-methods/phone.svg?react";
import { headerCta } from "../../app/site.data";
import style from "./FloatingCallButton.module.scss";

export const FloatingCallButton = () => (
  <a
    href={headerCta.href}
    data-promo-phone="floating_button"
    className={style.button}
    aria-label="Zadzwoń teraz"
    title="Zadzwoń teraz"
  >
    <PhoneIcon className={style.icon} aria-hidden="true" focusable="false" />
  </a>
);
