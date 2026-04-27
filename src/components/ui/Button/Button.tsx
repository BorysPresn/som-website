import clsx from "clsx";
import type { ButtonIcons } from "../../../types/types";
import { Icon } from "../Icon/Icon";
import style from "./Button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  iconName?: ButtonIcons;
  href?: string;
  target?: string;
  variant: "primary" | "call";
}

export const Button = ({
  text = "Umów wizytę",
  iconName,
  href,
  variant,
  ...props
}: ButtonProps) => {
  const classNames = clsx(style.button, style[variant]);
  const content = (
    <>
      <span className={style.label}>{text}</span>
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
    <button className={classNames} {...props}>
      {content}
    </button>
  );
};
