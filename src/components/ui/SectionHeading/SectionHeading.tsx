import clsx from "clsx";
import style from "./SectionHeading.module.scss";

type HeadingLevel = 1 | 2 | 3;

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  level?: HeadingLevel;
  className?: string;
  titleClassName?: string;
  desktopUppercase?: boolean;
};

export const SectionHeading = ({
  eyebrow,
  title,
  titleId,
  level = 2,
  className,
  titleClassName,
  desktopUppercase = true,
}: SectionHeadingProps) => {
  const HeadingTag = `h${level}` as const;

  return (
    <div className={clsx(style.heading, className)}>
      <p className={style.eyebrow}>{eyebrow}</p>
      <HeadingTag
        id={titleId}
        className={clsx(
          style.title,
          desktopUppercase && style.titleDesktopUppercase,
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>
    </div>
  );
};
