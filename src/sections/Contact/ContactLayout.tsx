import clsx from "clsx";
import { trackContactLinkClick } from "../../app/analytics";
import { Container } from "../../components/layout/Container/Container";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import type { ReactNode } from "react";
import { contactCopy, contactDetails, contactMap } from "./contact.data";
import style from "./Contact.module.scss";

export const ContactLayout = ({
  children,
  methodsBeforeMap = false,
}: {
  children: ReactNode;
  methodsBeforeMap?: boolean;
}) => {
  return (
    <section
      id="contact"
      className={clsx(
        style.section,
        methodsBeforeMap && style.methodsBeforeMap,
      )}
      aria-labelledby="contact-title"
    >
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
                          onClick={() => {
                            if (item.analyticsMethod) {
                              trackContactLinkClick({
                                method: item.analyticsMethod,
                                location: "contact_details",
                              });
                            }
                          }}
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

          <div className={style.actionColumn}>{children}</div>
        </div>
      </Container>
    </section>
  );
};
