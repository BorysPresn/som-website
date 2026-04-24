import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { processSteps } from "./process.data";
import style from "./Process.module.scss";

const eyebrow = "Proces serwisu";
const title = "Jak przebiega naprawa";
const ctaText = "Um\u00F3w wizyt\u0119";

export const Process = () => {
  return (
    <section id="process" className={style.section}>
      <Container>
        <div className={style.content}>
          <div className={style.header}>
            <p className={style.eyebrow}>{eyebrow}</p>
            <h2 className={style.title}>{title}</h2>
          </div>

          <ol className={style.steps}>
            {processSteps.map((step) => (
              <li key={step.number} className={style.step}>
                <span className={style.stepNumber}>{step.number}</span>
                <div className={style.stepContent}>
                  <h3 className={style.stepTitle}>{step.title}</h3>
                  <p className={style.stepText}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={style.media} aria-hidden="true" />

          <div className={style.cta}>
            <Button
              variant="primary"
              text={ctaText}
              href="#contact"
              iconName="arrow-right"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
