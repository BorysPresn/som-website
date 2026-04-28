import clsx from "clsx";
import type { ButtonIcons } from "../../../types/types";
import { Icon } from "../Icon/Icon";
import style from "./Button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  iconName?: ButtonIcons;
  href?: string;
  target?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant: "primary" | "call";
}

const defaultButtonTextByVariant: Record<ButtonProps["variant"], string> = {
  primary: "Um\u00F3w wizyt\u0119",
  call: "Zadzwo\u0144 teraz",
};

export const Button = ({
  text,
  iconName,
  href,
  type = "button",
  variant,
  ...props
}: ButtonProps) => {
  const classNames = clsx(style.button, style[variant]);
  const buttonText = text ?? defaultButtonTextByVariant[variant];
  const content = (
    <>
      <span className={style.label}>{buttonText}</span>
      {iconName && (
        <div className={style["icon-container"]}>
          <Icon name={iconName} variant="button" className={style.icon} />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classNames} type={type} {...props}>
      {content}
    </button>
  );
};
