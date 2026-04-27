import { useState } from "react";
import clsx from "clsx";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { faqCopy, faqItems } from "./faq.data";
import style from "./FAQ.module.scss";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={style.section} aria-labelledby="faq-title">
      <Container>
        <div className={style.content}>
          <div className={style.intro}>
            <div className={style.headingGroup}>
              <p className={style.eyebrow}>{faqCopy.eyebrow}</p>
              <h2 id="faq-title" className={style.title}>
                {faqCopy.title}
              </h2>
            </div>

            <div className={style.cta}>
              <Button
                href="#contact"
                variant="primary"
                text={faqCopy.cta}
                iconName="arrow-right"
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
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
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
