import clsx from "clsx";
import type { ButtonIcons } from "../../../types/types";
import { Icon } from "../Icon/Icon";
import style from "./Button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  iconName?: ButtonIcons;
  href?: string;
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
      {iconName === "arrow-right" && (
        <div className={style["icon-container"]}>
          <Icon name="arrow-right" variant="button" className={style.icon} />
        </div>
      )}
      {iconName === "arrow-up-right" && (
        <Icon name="arrow-up-right" variant="button" className={style.icon} />
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
