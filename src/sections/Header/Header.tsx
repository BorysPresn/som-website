import clsx from "clsx";
import { useState } from "react";
import burgerIcon from "../../assets/icons/burger.svg";
import { siteLogo, siteNavigation } from "../../app/site.data";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import style from "./Header.module.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderNavList = () => {
    return siteNavigation.map((item) => (
      <li key={item.href}>
        <a href={item.href}>{item.label}</a>
      </li>
    ));
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={style.header}>
      <div className={style.bar}>
        <Container>
          <div className={style.row}>
            <a href={siteLogo.href} aria-label="S.O.M. Serwis">
              <img
                src={siteLogo.src}
                alt={siteLogo.alt}
                width={74}
                height={74}
                className={style.logo}
              />
            </a>
            <nav className={style.desktopNav} aria-label="Main navigation">
              <ul className={style.navList}>{renderNavList()}</ul>
            </nav>
            <div className={style.desktopCta}>
              <Button variant="call" text="Zadzwon teraz" />
            </div>
            <button
              type="button"
              className={clsx(style.burger, isMenuOpen && style.burgerMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              <img
                src={burgerIcon}
                alt=""
                aria-hidden="true"
                className={style.burgerIcon}
              />
            </button>
          </div>
        </Container>
      </div>

      <div
        id="mobile-menu"
        className={clsx(style.mobileMenu, isMenuOpen && style.mobileMenuOpen)}
      >
        <Container>
          <nav className={style.mobileNav} aria-label="Mobile navigation">
            <ul className={style.mobileNavList}>{renderNavList()}</ul>
          </nav>
          <div className={style.mobileCta}>
            <Button variant="call" text="Zadzwon teraz" />
          </div>
        </Container>
      </div>
    </header>
  );
};
