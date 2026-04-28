import clsx from "clsx";
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
                <img src={method.icon} alt="" aria-hidden="true" />
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
