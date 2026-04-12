import clsx from "clsx";
import type { SVGProps } from "react";
import type { IconName } from "../../../types/types";
import { iconMap } from "./iconMap";
import style from "./Icon.module.scss";

type IconVariant = "button" | "topbar" | "footer" | "contact";

const sizes: Record<IconVariant, number> = {
  button: 20,
  topbar: 17,
  footer: 24,
  contact: 40,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  variant: IconVariant;
  size?: number | string;
  title?: string;
}

export const Icon = ({
  name,
  variant,
  size,
  title,
  className,
  width,
  height,
  "aria-hidden": ariaHidden,
  ...props
}: IconProps) => {
  const SvgIcon = iconMap[name];

  if (!SvgIcon) {
    if (import.meta.env.DEV) {
      console.warn(`Icon "${name}" is not registered in iconMap.`);
    }

    return null;
  }

  const isDecorative = title == null || title.length === 0;
  const resolvedSize = size ?? sizes[variant];

  return (
    <SvgIcon
      width={width ?? resolvedSize}
      height={height ?? resolvedSize}
      aria-hidden={ariaHidden ?? isDecorative}
      role={isDecorative ? undefined : "img"}
      focusable="false"
      className={clsx(style.icon, variant && style[variant], className)}
      {...(!isDecorative ? { title } : {})}
      {...props}
    />
  );
};
