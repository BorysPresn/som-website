import logo from "../assets/images/logo_web.png";
import type { SocialMediaIcons } from "../types/types";

export const siteLogo = {
  src: logo,
  alt: "S.O.M. Serwis logo",
  href: "/",
};

export const siteNavigation = [
  { href: "#services", label: "Us\u0142ugi" },
  { href: "#about", label: "O nas" },
  { href: "#reviews", label: "Opinie" },
  { href: "#contact", label: "Kontakt" },
];

type SocialLink = {
  href: string;
  label: string;
  icon: SocialMediaIcons;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/groups/auto.seriws.s.o.m2020/",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://www.instagram.com/auto_serwis_s_o_m_/",
    label: "Instagram",
    icon: "instagram",
  },
];
