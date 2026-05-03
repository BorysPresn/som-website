import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import serviceBayImage from "../../assets/images/why-us/service-bay.jpg";
import style from "./About.module.scss";

const aboutTitle = "Dlaczego warto nam zaufa\u0107";
const aboutLead =
  "Nasz zesp\u00F3\u0142 zapewnia szybk\u0105 i skuteczn\u0105 napraw\u0119, aby Tw\u00F3j samoch\u00F3d by\u0142 niezawodny jak najd\u0142u\u017Cej.";
const serviceBayAlt = "Samochody na podno\u015Bnikach w hali serwisowej.";

const aboutItems = [
  {
    title: "Wieloletnie do\u015Bwiadczenie",
    description:
      "Na co dzień pracujemy z różnymi samochodami i typami usterek.",
  },
  {
    title: "Profesjonalna kadra",
    description:
      "Nasi mechanicy i elektromechanicy to specjali\u015Bci z wieloletnim sta\u017Cem i dokładnym podejściem.", 
  },
  {
    title: "Nowoczesne narz\u0119dzia",
    description:
      "Stosujemy zaawansowane urz\u0105dzenia diagnostyczne oraz wysokiej jako\u015Bci cz\u0119\u015Bci.",
  },
  {
    title: "Szybkie terminy realizacji",
    description:
      "Działamy sprawnie, bez zbędnego oczekiwania.",
  },
];

export const About = () => {
  return (
    <section id="about" className={style.section}>
      <Container>
        <div className={style.content}>
          <div className={style.header}>
            <SectionHeading
              eyebrow="O nas"
              title={aboutTitle}
              className={style.headingGroup}
              titleClassName={style.title}
            />

            <p className={style.lead}>{aboutLead}</p>
          </div>

          <div className={style.body}>
            <div className={style.imageWrap}>
              <img
                src={serviceBayImage}
                alt={serviceBayAlt}
                width={1600}
                height={1066}
                loading="lazy"
                decoding="async"
                className={style.image}
              />
            </div>

            <div className={style.rightColumn}>
              <div className={style.list}>
                {aboutItems.map((item) => (
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
