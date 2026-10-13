import clsx from "clsx";
import { trackContactLinkClick } from "../../app/analytics";
import { contactMethods, contactMethodsCopy } from "./contactMethods.data";
import style from "./Contact.module.scss";

type ContactMethodsProps = {
  showHeading?: boolean;
  callback?: { title: string; description: string; onClick: () => void };
};

export const ContactMethods = ({
  callback,
  showHeading = true,
}: ContactMethodsProps) => {
  return (
    <div
      className={clsx(
        style.methods,
        !showHeading && style.methodsWithoutHeading,
      )}
    >
      {showHeading && (
        <h3 className={style.methodsTitle}>{contactMethodsCopy.title}</h3>
      )}

      <div className={style.methodsList}>
        {contactMethods.map((method) => {
          const callbackAction =
            method.analyticsMethod === "phone" ? callback : undefined;
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
                <span className={style.methodTitle}>
                  {callbackAction?.title ?? method.title}
                </span>
                <span className={style.methodDescription}>
                  {callbackAction?.description ?? method.description}
                </span>
              </span>
            </>
          );

          const className = clsx(
            style.methodCard,
            method.href && style.methodLink,
          );
          const isExternalLink = method.href?.startsWith("http");

          if (callbackAction) {
            return (
              <button
                key={method.title}
                type="button"
                className={clsx(className, style.methodButton)}
                onClick={callbackAction.onClick}
              >
                {content}
              </button>
            );
          }

          if (method.href) {
            return (
              <a
                key={method.title}
                className={className}
                href={method.href}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noreferrer" : undefined}
                onClick={() => {
                  trackContactLinkClick({
                    method: method.analyticsMethod,
                    location: "contact_methods",
                  });
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
