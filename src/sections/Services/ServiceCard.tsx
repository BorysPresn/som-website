import type { ServiceCardConfig } from "./services.data";
import style from "./Services.module.scss";

export const ServiceCard = ({
  title,
  description,
  imageAlt,
  backgroundStyle,
}: ServiceCardConfig) => {
  return (
    <a href="#contact" className={style.card} aria-label={`${title}. Przejdź do sekcji kontakt.`}>
      <div
        className={style.background}
        style={backgroundStyle}
        role="img"
        aria-label={imageAlt}
      />
      <div className={style.overlay} />
      <div className={style.cardContent}>
        <h3 className={style.cardTitle}>{title}</h3>
        <p className={style.cardDescription}>{description}</p>
      </div>
    </a>
  );
};
