import { useEffect, useState } from "react";
import { Container } from "../../components/layout/Container/Container";
import { Icon } from "../../components/ui/Icon/Icon";
import { StatusIcon } from "./StatusIcon";
import style from "./TopBar.module.scss";

interface TopBarProps {}

const OPEN_AT = 9;
const CLOSE_AT = 18;

const isOpen = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day === 0 || day === 6) return false;
  if (hour < OPEN_AT || hour >= CLOSE_AT) return false;

  return true;
};

export const TopBar = ({}: TopBarProps) => {
  const [open, setOpen] = useState(isOpen());
  useEffect(() => {
    const id = window.setInterval(() => {
      setOpen(isOpen());
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const status = open ? "Otwarte" : "Zamknięte";

  return (
    <div className={style.topbar}>
      <Container>
        <div className={style.wrapper}>
          <div className={style.social}>
            <a
              href="https://www.facebook.com/groups/auto.seriws.s.o.m2020/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Icon name="facebook" variant="topbar" />
            </a>
            <a
              href="https://www.instagram.com/auto_serwis_s_o_m_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Icon name="instagram" variant="topbar" />
            </a>
          </div>
          <div className={style.schedule}>
            <span className={style.status}>
              {status} teraz <StatusIcon isOpen={open} />
            </span>
            <span>|</span>
            <span>Pon-Pt 9:00-18:00 | Sobota, Niedziela - Zamknięte</span>
          </div>
        </div>
      </Container>
    </div>
  );
};
