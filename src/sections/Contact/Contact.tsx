import { Container } from "../../components/layout/Container/Container";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { ContactForm } from "./ContactForm";
import { ContactMethods } from "./ContactMethods";
import { contactCopy, contactDetails, contactMap } from "./contact.data";
import style from "./Contact.module.scss";

export const Contact = () => {
  return (
    <section id="contact" className={style.section} aria-labelledby="contact-title">
      <Container>
        <div className={style.content}>
          <div className={style.infoColumn}>
            <div className={style.infoIntro}>
              <div className={style.headingBlock}>
                <SectionHeading
                  eyebrow={contactCopy.eyebrow}
                  title={contactCopy.title}
                  titleId="contact-title"
                  className={style.headingGroup}
                  titleClassName={style.title}
                />

                <p className={style.description}>{contactCopy.description}</p>
              </div>

              <address className={style.details} aria-label="Dane kontaktowe">
                {contactDetails.map((item) => {
                  const isExternalLink = item.href?.startsWith("http");

                  return (
                    <div key={item.label} className={style.detailItem}>
                      <span className={style.detailLabel}>{item.label}</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={style.detailValue}
                          target={isExternalLink ? "_blank" : undefined}
                          rel={isExternalLink ? "noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className={style.detailValue}>{item.value}</span>
                      )}
                    </div>
                  );
                })}
              </address>
            </div>

            <div className={style.mapWrap}>
              <iframe
                className={style.map}
                title={contactMap.title}
                src={contactMap.src}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className={style.actionColumn}>
            <ContactForm />
            <ContactMethods />
          </div>
        </div>
      </Container>
    </section>
  );
};
