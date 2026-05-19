import clsx from "clsx";
import { useEffect, useState } from "react";
import { trackCtaClick } from "../../app/analytics";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import slide1 from "../../assets/images/slide1_desktop.webp";
import slide1Mobile from "../../assets/images/slide1_mobile.webp";
import style from "./Hero.module.scss";

const desktopSliderQuery = "(min-width: 769px)";

const loadDesktopSlides = async () => {
  const slideModules = await Promise.all([
    import("../../assets/images/slide2.webp"),
    import("../../assets/images/slide3.webp"),
    import("../../assets/images/slide4.webp"),
  ]);

  return slideModules.map((slideModule) => slideModule.default);
};

export const Hero = () => {
  const [isSliderEnabled, setIsSliderEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(desktopSliderQuery).matches;
  });
  const [slides, setSlides] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopSliderQuery);

    const handleMediaChange = () => {
      setIsSliderEnabled(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setActiveSlide(0);
      }
    };

    handleMediaChange();
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isSliderEnabled || slides.length > 0) {
      return;
    }

    let isMounted = true;

    loadDesktopSlides().then((loadedSlides) => {
      if (isMounted) {
        setSlides(loadedSlides);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isSliderEnabled, slides.length]);

  useEffect(() => {
    const slideCount = slides.length + 1;

    if (!isSliderEnabled || slideCount <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 4000);

    return () => window.clearInterval(id);
  }, [isSliderEnabled, slides.length]);

  return (
    <section id="hero" className={style.heroSection}>
      <div className={style.media}>
        <div className={style.desktopSlider}>
          <picture>
            <source media="(max-width: 768px)" srcSet={slide1Mobile} />
            <img
              src={slide1}
              alt=""
              aria-hidden="true"
              width={1920}
              height={831}
              loading="eager"
              fetchPriority="high"
              className={clsx(
                style.slide,
                activeSlide === 0 && style.slideActive,
              )}
            />
          </picture>

          {isSliderEnabled &&
            slides.map((slide, index) => (
              <img
                key={slide}
                src={slide}
                alt=""
                aria-hidden="true"
                width={1920}
                height={831}
                loading="eager"
                decoding="async"
                className={clsx(
                  style.slide,
                  index + 1 === activeSlide && style.slideActive,
                )}
              />
            ))}
        </div>

        <div className={style.overlay} />
      </div>

      <Container>
        <div className={style.content}>
          <div className={style.textContent}>
            <h1 className={style.title}>
              Serwis samochodowy Poznań - Wysogotowo
            </h1>
            <p className={style.text}>
              Diagnostyka i naprawa samochodów osobowych i dostawczych.
              <br />
              Jasna wycena przed rozpoczęciem prac i krótkie terminy realizacji.
            </p>
            <p className={style.text}>
              Geometria kół 3D · Wymiana opon · Naprawy mechaniczne
            </p>
          </div>

          <Button
            variant="primary"
            iconName="arrow-right"
            href="#contact"
            text="Umów termin"
            onClick={() => {
              trackCtaClick({ label: "umow_termin", location: "hero" });
            }}
          />
        </div>
      </Container>
    </section>
  );
};
