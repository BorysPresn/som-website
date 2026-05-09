import { trackAnalyticsEvent } from "../../app/analytics";
import { Container } from "../../components/layout/Container/Container";
import { Button } from "../../components/ui/Button/Button";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { ReviewCard } from "./ReviewCard";
import { reviews, reviewsContent } from "./reviews.data";
import style from "./Reviews.module.scss";

export const Reviews = () => {
  return (
    <section id="reviews" className={style.section}>
      <Container>
        <div className={style.content}>
          <SectionHeading
            eyebrow={reviewsContent.eyebrow}
            title={reviewsContent.title}
            className={style.header}
          />

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
              onClick={() => {
                trackAnalyticsEvent("reviews_source_click", {
                  source: "google_maps",
                });
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
