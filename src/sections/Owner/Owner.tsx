import type { ReactNode } from "react";
import { Container } from "../../components/layout/Container/Container";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import ownerImage from "../../assets/images/owner/owner.jpg";
import style from "./Owner.module.scss";

const eyebrow = "KTO STOI ZA WARSZTATEM";
const title = "Osoba decyzyjna";
const ownerAlt = "Osoba decyzyjna warsztatu S.O.M. Serwis w hali serwisowej.";

const paragraphs: ReactNode[] = [
  <>
    Za warsztat odpowiada właściciel — <strong>Aleksander Szpakiewicz</strong>,
    który od ponad <strong>20 lat zajmuje się naprawą samochodów</strong>.
  </>,
  <>
    Serwis działa w Polsce od <strong>9 lat</strong> i obsługuje{" "}
    <strong>150-220 klientów miesięcznie</strong>, z czego{" "}
    <strong>80-90% to stali klienci</strong>.
  </>,
  <>
    Warsztat pracuje z większością popularnych marek (m.in. Mercedes, VAG,
    Peugeot, Citroën, Renault, Fiat) i wykonuje zarówno bieżące naprawy, jak i{" "}
    <strong>bardziej złożone prace - w tym silniki i skrzynie biegów</strong>.
  </>,
  <>
    Często trafiają tu klienci po innych serwisach, gdzie problem nie został
    rozwiązany - tutaj <strong>naprawa jest doprowadzana do końca</strong>.
  </>,
  <>
    Każdy samochód przechodzi <strong>sprawdzenie po naprawie</strong>. Na
    wykonane usługi udzielana jest <strong>gwarancja</strong>, a w razie błędu
    po stronie warsztatu -{" "}
    <strong>usterka usuwana jest na koszt firmy</strong>.
  </>,
  <>
    Jeśli problem da się naprawić - <strong>tutaj zostanie naprawiony</strong>.
  </>,
];

export const Owner = () => {
  return (
    <section id="owner" className={style.section} aria-labelledby="owner-title">
      <Container>
        <div className={style.content}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            titleId="owner-title"
            className={style.headingGroup}
            titleClassName={style.title}
          />

          <div className={style.textGroup}>
            <div className={style.imageWrap}>
              <img
                src={ownerImage}
                alt={ownerAlt}
                width={688}
                height={1032}
                loading="lazy"
                decoding="async"
                className={style.image}
              />
            </div>

            <div className={style.text}>
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
