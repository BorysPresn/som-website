import clsx from "clsx";
import type { ButtonIcons } from "../../../types/types";
import style from "./Button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  iconName?: ButtonIcons;
  href?: string;
  variant: "primary" | "call";
}

export const Button = ({
  text,
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
          <span className={style.icon}>→</span>
        </div>
      )}
      {iconName === "arrow-up" && <span>←</span>}
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
