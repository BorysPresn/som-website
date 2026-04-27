import { Container } from "../../components/layout/Container/Container";
import ownerImage from "../../assets/images/owner/owner.jpg";
import style from "./Owner.module.scss";

const eyebrow = "KTO STOI ZA WARSZTATEM";
const title = "Osoba decyzyjna";
const ownerAlt = "Osoba decyzyjna warsztatu S.O.M. Serwis w hali serwisowej.";

const paragraphs = [
  "Za warsztat odpowiada w\u0142a\u015Bciciel — Aleksander Szpakiewicz, kt\u00F3ry od ponad 20 lat zajmuje si\u0119 napraw\u0105 samochod\u00F3w.",
  "Serwis dzia\u0142a w Polsce od 9 lat i obs\u0142uguje 150–220 klient\u00F3w miesi\u0119cznie, z czego 80–90% to stali klienci.",
  "Warsztat pracuje z wi\u0119kszo\u015Bci\u0105 popularnych marek (m.in. Mercedes, VAG, Peugeot, Citro\u00EBn, Renault, Fiat) i wykonuje zar\u00F3wno bie\u017C\u0105ce naprawy, jak i z\u0142o\u017Cone prace — w tym silniki i skrzynie bieg\u00F3w.",
  "Cz\u0119sto trafiaj\u0105 tu klienci po innych serwisach, gdzie problem nie zosta\u0142 rozwi\u0105zany — tutaj naprawa jest doprowadzana do ko\u0144ca.",
  "Ka\u017Cdy samoch\u00F3d przechodzi jazd\u0119 testow\u0105 po naprawie. Na wykonane us\u0142ugi udzielana jest gwarancja — a w razie b\u0142\u0119du po stronie warsztatu, usterka usuwana jest na koszt firmy.",
  "Je\u015Bli problem da si\u0119 naprawi\u0107 — tutaj zostanie naprawiony.",
];

export const Owner = () => {
  return (
    <section className={style.section} aria-labelledby="owner-title">
      <Container>
        <div className={style.content}>
          <div className={style.headingGroup}>
            <p className={style.eyebrow}>{eyebrow}</p>
            <h2 id="owner-title" className={style.title}>
              {title}
            </h2>
          </div>

          <div className={style.textGroup}>
            <div className={style.imageWrap}>
              <img src={ownerImage} alt={ownerAlt} className={style.image} />
            </div>

            <div className={style.text}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
