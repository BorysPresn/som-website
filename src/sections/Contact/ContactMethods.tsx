import clsx from "clsx";
import { trackContactLinkClick } from "../../app/analytics";
import { contactMethods, contactMethodsCopy } from "./contactMethods.data";
import style from "./Contact.module.scss";

export const ContactMethods = () => {
  return (
    <div className={style.methods}>
      <h3 className={style.methodsTitle}>{contactMethodsCopy.title}</h3>

      <div className={style.methodsList}>
        {contactMethods.map((method) => {
          const content = (
            <>
              <span
                className={clsx(
                  style.methodIcon,
                  method.iconVariant === "wide" && style.methodIconWide,
                )}
              >
                <img
                  src={method.icon}
                  alt=""
                  width={method.iconWidth}
                  height={method.iconHeight}
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </span>

              <span className={style.methodText}>
                <span className={style.methodTitle}>{method.title}</span>
                <span className={style.methodDescription}>
                  {method.description}
                </span>
              </span>
            </>
          );

          const className = clsx(style.methodCard, method.href && style.methodLink);
          const isExternalLink = method.href?.startsWith("http");

          if (method.href) {
            return (
              <a
                key={method.title}
                className={className}
                href={method.href}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noreferrer" : undefined}
                onClick={() => {
                  trackContactLinkClick(method.title, "contact_methods");
                }}
              >
                {content}
              </a>
            );
          }

          return (
            <article key={method.title} className={className}>
              {content}
            </article>
          );
        })}
      </div>
    </div>
  );
};
