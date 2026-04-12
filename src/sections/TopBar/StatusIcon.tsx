import style from "./TopBar.module.scss";

export const StatusIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      className={isOpen ? style.statusOpen : style.statusClosed}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1" />
      <circle cx="9" cy="9" r="4" fill="currentColor" />
    </svg>
  );
};
