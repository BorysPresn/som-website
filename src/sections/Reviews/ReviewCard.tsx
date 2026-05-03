import clsx from "clsx";
import { useId, useState } from "react";
import { Icon } from "../../components/ui/Icon/Icon";
import style from "./Reviews.module.scss";

interface ReviewCardProps {
  author: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

const maxRating = 5;
const expandableReviewLength = 150;
const showMoreText = "Poka\u017C wi\u0119cej";
const showLessText = "Poka\u017C mniej";

export const ReviewCard = ({
  author,
  role,
  avatar,
  text,
  rating,
}: ReviewCardProps) => {
  const reviewTextId = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = text.length > expandableReviewLength;

  return (
    <article className={style.card}>
      <div className={style.cardHeader}>
        <div className={style.avatar}>
          <img
            src={avatar}
            alt=""
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className={style.avatarImage}
          />
        </div>

        <div className={style.authorInfo}>
          <div className={style.authorRow}>
            <h3 className={style.author}>{author}</h3>
            <span className={style.googleMark}>
              <Icon name="google" variant="brand" />
              <span className={style.visuallyHidden}>Google review</span>
            </span>
          </div>
          <p className={style.role}>{role}</p>
        </div>
      </div>

      <p
        id={reviewTextId}
        className={clsx(
          style.reviewText,
          isExpandable && !isExpanded && style.reviewTextCollapsed,
        )}
      >
        {text}
      </p>

      {isExpandable && (
        <button
          type="button"
          className={style.reviewToggle}
          aria-expanded={isExpanded}
          aria-controls={reviewTextId}
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          {isExpanded ? showLessText : showMoreText}
        </button>
      )}

      <div className={style.rating}>
        <span className={style.visuallyHidden}>
          Ocena: {rating} z {maxRating}
        </span>
        {Array.from({ length: maxRating }, (_, index) => (
          <span
            key={index}
            className={clsx(style.star, index >= rating && style.starMuted)}
            aria-hidden="true"
          >
            <Icon name="star" variant="rating" />
          </span>
        ))}
      </div>
    </article>
  );
};
