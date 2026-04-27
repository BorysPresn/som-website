import clsx from "clsx";
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

export const ReviewCard = ({
  author,
  role,
  avatar,
  text,
  rating,
}: ReviewCardProps) => {
  return (
    <article className={style.card}>
      <div className={style.cardHeader}>
        <div className={style.avatar}>
          <img src={avatar} alt="" className={style.avatarImage} />
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

      <p className={style.reviewText}>{text}</p>

      <div className={style.rating} aria-label={`${rating} z ${maxRating}`}>
        {Array.from({ length: maxRating }, (_, index) => (
          <span
            key={index}
            className={clsx(
              style.star,
              index >= rating && style.starMuted,
            )}
            aria-hidden="true"
          >
            <Icon name="star" variant="rating" />
          </span>
        ))}
      </div>
    </article>
  );
};
