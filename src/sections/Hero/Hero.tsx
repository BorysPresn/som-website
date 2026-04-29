import clsx from "clsx";
import { useEffect, useState } from "react";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import style from "./Hero.module.scss";

const desktopSliderQuery = "(min-width: 769px)";

const loadDesktopSlides = async () => {
  const slideModules = await Promise.all([
    import("../../assets/images/slide1.jpg"),
    import("../../assets/images/slide2.jpg"),
    import("../../assets/images/slide3.jpg"),
    import("../../assets/images/slide4.jpg"),
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
    if (!isSliderEnabled || slides.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(id);
  }, [isSliderEnabled, slides.length]);

  return (
    <section className={style.heroSection}>
      <div className={style.media}>
        {isSliderEnabled && slides.length > 0 && (
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
        )}

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
            iconName="arrow-right"
            href="#contact"
          />
        </div>
      </Container>
    </section>
  );
};
