import { Container } from "../../components/layout/Container/Container";
import { ServiceCard } from "./ServiceCard";
import { servicesData } from "./services.data";
import style from "./Services.module.scss";

export const Services = () => {
  return (
    <section id="services" className={style.servicesSection}>
      <Container>
        <div className={style.content}>
          <div className={style.header}>
            <p className={style.eyebrow}>Co robimy</p>
            <h2 className={style.title}>Zakres usług serwisowych</h2>
          </div>

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
