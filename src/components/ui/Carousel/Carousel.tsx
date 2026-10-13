import clsx from "clsx";
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import style from "./Carousel.module.scss";

interface CarouselProps {
  children: ReactNode;
  label: string;
  mobileOnly?: boolean;
}

export const Carousel = ({
  children,
  label,
  mobileOnly = false,
}: CarouselProps) => {
  const items = Children.toArray(children);
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    index: 0,
    atStart: true,
    atEnd: true,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updatePosition = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const start = slides[0]?.offsetLeft ?? 0;
      let index = 0;
      slides.forEach((slide, slideIndex) => {
        if (
          Math.abs(slide.offsetLeft - start - track.scrollLeft) <
          Math.abs(
            (slides[index]?.offsetLeft ?? start) - start - track.scrollLeft,
          )
        ) {
          index = slideIndex;
        }
      });

      const next = {
        index,
        atStart: track.scrollLeft <= 2,
        atEnd: track.scrollWidth - track.clientWidth - track.scrollLeft <= 2,
      };
      setPosition((current) =>
        current.index === next.index &&
        current.atStart === next.atStart &&
        current.atEnd === next.atEnd
          ? current
          : next,
      );
    };

    let frameId = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePosition);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(track);
    Array.from(track.children).forEach((slide) => observer.observe(slide));
    track.addEventListener("scroll", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", scheduleUpdate);
      cancelAnimationFrame(frameId);
    };
  }, [items.length]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.max(
      0,
      Math.min(items.length - 1, position.index + direction),
    );
    const slide = track.children[index] as HTMLElement | undefined;
    const first = track.children[0] as HTMLElement | undefined;
    if (!slide || !first) return;

    track.scrollTo({
      left: slide.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <div
      className={clsx(style.carousel, mobileOnly && style.mobileOnly)}
      role="region"
      aria-label={label}
      aria-roledescription="karuzela"
    >
      <div
        id={trackId}
        ref={trackRef}
        className={style.track}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (
            event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
          )
            return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {items.map((item, index) => (
          <div
            key={isValidElement(item) ? item.key : index}
            className={style.slide}
            role="group"
            aria-label={`${index + 1} z ${items.length}`}
          >
            {item}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className={style.controls}>
          <button
            type="button"
            className={style.previous}
            aria-label="Poprzedni"
            title="Poprzedni"
            aria-controls={trackId}
            disabled={position.atStart}
            onClick={() => move(-1)}
          >
            <span className={style.chevron} aria-hidden="true">
              {"\u2039"}
            </span>
          </button>
          <span className={style.counter}>
            {position.index + 1} / {items.length}
          </span>
          <button
            type="button"
            className={style.next}
            aria-label="Następny"
            title="Następny"
            aria-controls={trackId}
            disabled={position.atEnd}
            onClick={() => move(1)}
          >
            <span className={style.chevron} aria-hidden="true">
              {"\u203a"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
