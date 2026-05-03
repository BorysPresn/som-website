import { Container } from "../../components/layout/Container/Container";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { servicesData } from "./services.data";
import style from "./Services.module.scss";

export const Services = () => {
  return (
    <section id="services" className={style.servicesSection}>
      <Container>
        <div className={style.content}>
          <SectionHeading
            eyebrow="Co robimy"
            title="Zakres usług serwisowych"
            className={style.header}
            titleClassName={style.title}
          />
          <p className={style.text}>
            Zajmujemy się bieżącą obsługą i naprawami samochodów — od prostych
            prac po bardziej złożone usterki. Wśród nich m.in. geometria kół 3D,
            wymiana opon oraz mechanika pojazdowa.
          </p>
          <div className={style.grid}>
            {servicesData.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
