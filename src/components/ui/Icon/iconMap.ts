import type { FC, SVGProps } from "react";
import ArrowRightIcon from "../../../assets/icons/arrow-right.svg?react";
import ArrowUpRightIcon from "../../../assets/icons/arrow-up-right.svg?react";
import FacebookIcon from "../../../assets/icons/facebook.svg?react";
import GoogleIcon from "../../../assets/icons/google-icon-logo.svg?react";
import InstagramIcon from "../../../assets/icons/instagram.svg?react";
import StarIcon from "../../../assets/icons/star.svg?react";
import TikTokIcon from "../../../assets/icons/tik-tok.svg?react";
import type { IconName } from "../../../types/types";

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export const iconMap: Partial<Record<IconName, IconComponent>> = {
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
  "facebook": FacebookIcon,
  "google": GoogleIcon,
  "instagram": InstagramIcon,
  "star": StarIcon,
  "tik-tok": TikTokIcon,
};
