import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import serviceBayImage from "../../assets/images/why-us/service-bay.jpg";
import style from "./WhyUs.module.scss";

const whyUsItems = [
  {
    title: "Wieloletnie doświadczenie",
    description:
      "Działamy na rynku od 15 lat, naprawiając dziesiątki aut miesięcznie.",
  },
  {
    title: "Profesjonalna kadra",
    description:
      "Nasi mechanicy i elektromechanicy to specjaliści z wieloletnim stażem.",
  },
  {
    title: "Nowoczesne narzędzia",
    description:
      "Stosujemy zaawansowane urządzenia diagnostyczne oraz wysokiej jakości części.",
  },
  {
    title: "Szybkie terminy realizacji",
    description:
      "Cenimy Twój czas, dlatego naprawy realizujemy jak najszybciej.",
  },
];

export const WhyUs = () => {
  return (
    <section id="about" className={style.section}>
      <Container>
        <div className={style.content}>
          <div className={style.header}>
            <div className={style.headingGroup}>
              <p className={style.eyebrow}>O nas</p>
              <h2 className={style.title}>Dlaczego warto nam zaufać</h2>
            </div>

            <p className={style.lead}>
              Nasz zespół zapewnia szybką i skuteczną naprawę, aby Twój samochód
              był niezawodny jak najdłużej.
            </p>
          </div>

          <div className={style.body}>
            <div className={style.imageWrap}>
              <img
                src={serviceBayImage}
                alt="Samochody na podnośnikach w hali serwisowej."
                className={style.image}
              />
            </div>

            <div className={style.rightColumn}>
              <div className={style.list}>
                {whyUsItems.map((item) => (
                  <article key={item.title} className={style.listItem}>
                    <span className={style.dot} aria-hidden="true" />
                    <h3 className={style.itemTitle}>{item.title}</h3>
                    <p className={style.itemText}>{item.description}</p>
                  </article>
                ))}
              </div>

              <div className={style.cta}>
                <Button
                  variant="primary"
                  text="Umów wizytę"
                  href="#contact"
                  iconName="arrow-right"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
