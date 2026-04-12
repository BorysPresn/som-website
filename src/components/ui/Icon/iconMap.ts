import type { FC, SVGProps } from "react";
import ArrowRightIcon from "../../../assets/icons/arrow-right.svg?react";
import ArrowUpRightIcon from "../../../assets/icons/arrow-up-right.svg?react";
import FacebookIcon from "../../../assets/icons/facebook.svg?react";
import InstagramIcon from "../../../assets/icons/instagram.svg?react";
import TikTokIcon from "../../../assets/icons/tik-tok.svg?react";
import type { IconName } from "../../../types/types";

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export const iconMap: Partial<Record<IconName, IconComponent>> = {
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
  "facebook": FacebookIcon,
  "instagram": InstagramIcon,
  "tik-tok": TikTokIcon,
};
