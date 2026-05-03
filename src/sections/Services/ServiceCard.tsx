import type { ServiceCardConfig } from "./services.data";
import style from "./Services.module.scss";

export const ServiceCard = ({
  title,
  description,
  imageAlt,
  imageSrc,
  imageStyle,
}: ServiceCardConfig) => {
  return (
    <a href="#contact" className={style.card} aria-label={`${title}. Przejdź do sekcji kontakt.`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        width={720}
        height={480}
        loading="lazy"
        decoding="async"
        className={style.background}
        style={imageStyle}
      />
      <div className={style.overlay} />
      <div className={style.cardContent}>
        <h3 className={style.cardTitle}>{title}</h3>
        <p className={style.cardDescription}>{description}</p>
      </div>
    </a>
  );
};
