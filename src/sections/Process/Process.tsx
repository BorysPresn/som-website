import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import repairProcessImage from "../../assets/images/process/repair-process.webp";
import { processContent, processSteps } from "./process.data";
import style from "./Process.module.scss";

export const Process = () => {
  return (
    <section id="process" className={style.section}>
      <Container>
        <div className={style.content}>
          <SectionHeading
            eyebrow={processContent.eyebrow}
            title={processContent.title}
            className={style.header}
          />

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

          <div className={style.media}>
            <img
              src={repairProcessImage}
              alt={processContent.imageAlt}
              className={style.image}
            />
          </div>

          <div className={style.cta}>
            <Button
              variant="primary"
              text={processContent.ctaText}
              href="#contact"
              iconName="arrow-right"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
