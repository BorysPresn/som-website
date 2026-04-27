import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { ReviewCard } from "./ReviewCard";
import { reviews, reviewsContent } from "./reviews.data";
import style from "./Reviews.module.scss";

export const Reviews = () => {
  return (
    <section id="reviews" className={style.section}>
      <Container>
        <div className={style.content}>
          <div className={style.header}>
            <p className={style.eyebrow}>{reviewsContent.eyebrow}</p>
            <h2 className={style.title}>{reviewsContent.title}</h2>
          </div>

          <div className={style.list}>
            {reviews.map((review) => (
              <ReviewCard key={review.author} {...review} />
            ))}
          </div>

          <div className={style.cta}>
            <Button
              variant="primary"
              text={reviewsContent.ctaText}
              href={reviewsContent.sourceUrl}
              iconName="arrow-up-right"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
