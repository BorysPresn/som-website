import type { ReactNode } from "react";
import { Container } from "../../components/layout/Container/Container";
import { Carousel } from "../../components/ui/Carousel/Carousel";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { servicesData } from "./services.data";
import style from "./Services.module.scss";

export const Services = ({
  carousel = false,
  children,
}: {
  carousel?: boolean;
  children?: ReactNode;
}) => {
  const cards = servicesData.map((service) => (
    <ServiceCard key={service.analyticsId} {...service} />
  ));
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
          {carousel ? (
            <Carousel label="Usługi serwisowe" mobileOnly>
              {cards}
            </Carousel>
          ) : (
            <div className={style.grid}>{cards}</div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
};
