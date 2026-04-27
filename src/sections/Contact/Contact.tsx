import { Container } from "../../components/layout/Container/Container";
import { ContactForm } from "./ContactForm";
import { contactCopy, contactDetails, contactMap } from "./contact.data";
import style from "./Contact.module.scss";

export const Contact = () => {
  return (
    <section id="contact" className={style.section} aria-labelledby="contact-title">
      <Container>
        <div className={style.content}>
          <div className={style.headingBlock}>
            <div className={style.headingGroup}>
              <p className={style.eyebrow}>{contactCopy.eyebrow}</p>
              <h2 id="contact-title" className={style.title}>
                {contactCopy.title}
              </h2>
            </div>

            <p className={style.description}>{contactCopy.description}</p>
          </div>

          <address className={style.details} aria-label="Dane kontaktowe">
            {contactDetails.map((item) => (
              <div key={item.label} className={style.detailItem}>
                <span className={style.detailLabel}>{item.label}</span>
                {item.href ? (
                  <a href={item.href} className={style.detailValue}>
                    {item.value}
                  </a>
                ) : (
                  <span className={style.detailValue}>{item.value}</span>
                )}
              </div>
            ))}
          </address>

          <div className={style.mapWrap}>
            <iframe
              className={style.map}
              title={contactMap.title}
              src={contactMap.src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
};
