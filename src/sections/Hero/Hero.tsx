import clsx from "clsx";
import { useEffect, useState } from "react";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png";
import style from "./Hero.module.scss";

interface HeroProps {}

const slides = [slide1, slide2, slide3, slide4];

export const Hero = ({}: HeroProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={style.heroSection}>
      <div className={style.media}>
        <div className={style.desktopSlider}>
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt=""
              aria-hidden="true"
              className={clsx(
                style.slide,
                index === activeSlide && style.slideActive,
              )}
            />
          ))}
        </div>

        <div className={style.mobileImage}>
          <img
            src={slide1}
            alt=""
            aria-hidden="true"
            className={style.mobileImg}
          />
        </div>

        <div className={style.overlay} />
      </div>

      <Container>
        <div className={style.content}>
          <div className={style.textContent}>
            <h1 className={style.title}>
              Profesjonalny serwis samochodowy w Poznaniu
            </h1>
            <p className={style.text}>
              Specjalizujemy się w obsłudze samochodów osobowych i dostawczych.
              Oferujemy diagnostykę oraz naprawy mechaniczne, stawiając na
              uczciwą wycenę i szybkie terminy realizacji.
            </p>
          </div>

          <Button
            variant="primary"
            text="Umów wizytę"
            iconName="arrow-right"
          />
        </div>
      </Container>
    </section>
  );
};
