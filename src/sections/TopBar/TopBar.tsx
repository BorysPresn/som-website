import { useEffect, useState } from "react";
import { socialLinks } from "../../app/site.data";
import { Container } from "../../components/layout/Container/Container";
import { Icon } from "../../components/ui/Icon/Icon";
import { isBusinessOpen } from "./businessHours";
import { StatusIcon } from "./StatusIcon";
import style from "./TopBar.module.scss";

export const TopBar = () => {
  const [isOpen, setIsOpen] = useState(isBusinessOpen());
  useEffect(() => {
    const id = window.setInterval(() => {
      setIsOpen(isBusinessOpen());
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const status = isOpen ? "Otwarte" : "Zamknięte";

  return (
    <div className={style.topbar}>
      <Container>
        <div className={style.wrapper}>
          <div className={style.social}>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                className={style.socialLink}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <Icon name={link.icon} variant="topbar" />
              </a>
            ))}
          </div>
          <div className={style.schedule}>
            <span className={style.status}>
              {status} <StatusIcon isOpen={isOpen} />
            </span>
            <span>|</span>
            <span>Pon-Pt 9:00-18:00 | Sobota, Niedziela - Zamknięte</span>
          </div>
        </div>
      </Container>
    </div>
  );
};
