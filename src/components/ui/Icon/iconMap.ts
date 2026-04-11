import type { FC, SVGProps } from "react";
import ArrowRightIcon from "../../../assets/icons/arrow-right.svg?react";
import ArrowUpRightIcon from "../../../assets/icons/arrow-up-right.svg?react";
import type { IconName } from "../../../types/types";

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export const iconMap: Partial<Record<IconName, IconComponent>> = {
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
};
