import { siteLogo, siteNavigation, socialLinks } from "../../app/site.data";
import { Icon } from "../../components/ui/Icon/Icon";
import style from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <a href={siteLogo.href} aria-label="S.O.M. Serwis">
        <img
          src={siteLogo.src}
          alt={siteLogo.alt}
          width={80}
          height={80}
          className={style.logo}
        />
      </a>

      <nav className={style.nav} aria-label="Footer navigation">
        <ul className={style.navList}>
          {siteNavigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <ul className={style.socialList} aria-label="Social media">
        {socialLinks.map((link) => (
          <li key={link.href}>
            <a
              className={style.socialLink}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <Icon name={link.icon} variant="footer" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
