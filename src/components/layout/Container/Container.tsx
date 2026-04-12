import type { ReactNode } from "react";
import style from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={style.container} >{children}</div>;
};
