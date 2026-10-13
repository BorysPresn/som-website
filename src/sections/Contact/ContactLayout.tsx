import clsx from "clsx";
import { Container } from "../../components/layout/Container/Container";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import type { ReactNode } from "react";
import { contactCopy, contactMap } from "./contact.data";
import { ContactDetails } from "./ContactDetails";
import style from "./Contact.module.scss";

export const ContactLayout = ({
  children,
  methodsBeforeMap = false,
  detailsByMap = false,
}: {
  children: ReactNode;
  methodsBeforeMap?: boolean;
  detailsByMap?: boolean;
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

              {!detailsByMap && <ContactDetails />}
            </div>

            <div className={style.mapGroup}>
              {detailsByMap && <ContactDetails />}
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
          </div>

          <div className={style.actionColumn}>{children}</div>
        </div>
      </Container>
    </section>
  );
};
