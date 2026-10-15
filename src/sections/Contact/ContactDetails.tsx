import { trackContactLinkClick } from "../../app/analytics";
import { contactDetails } from "./contact.data";
import style from "./Contact.module.scss";

export const ContactDetails = () => (
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
);
