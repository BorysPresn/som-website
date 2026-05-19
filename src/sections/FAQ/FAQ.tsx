import { useState } from "react";
import clsx from "clsx";
import { trackCtaClick, trackFaqOpen } from "../../app/analytics";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { faqCopy, faqItems } from "./faq.data";
import style from "./FAQ.module.scss";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className={style.section} aria-labelledby="faq-title">
      <Container>
        <div className={style.content}>
          <div className={style.intro}>
            <SectionHeading
              eyebrow={faqCopy.eyebrow}
              title={faqCopy.title}
              titleId="faq-title"
              className={style.headingGroup}
              titleClassName={style.title}
            />

            <div className={style.cta}>
              <Button
                href="#contact"
                variant="primary"
                iconName="arrow-right"
                onClick={() => {
                  trackCtaClick({ label: "umow_wizyte", location: "faq" });
                }}
              />
            </div>
          </div>

          <div className={style.list}>
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article
                  key={item.question}
                  className={clsx(style.item, isOpen && style.itemOpen)}
                >
                  <button
                    className={style.question}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => {
                      setOpenIndex(isOpen ? -1 : index);

                      if (!isOpen) {
                        trackFaqOpen({
                          question: item.analyticsId,
                          location: "faq",
                        });
                      }
                    }}
                  >
                    <span>{item.question}</span>
                    <span className={style.chevron} aria-hidden="true" />
                  </button>

                  <div
                    id={answerId}
                    className={style.answerPanel}
                    aria-hidden={!isOpen}
                  >
                    <div className={style.answer}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
