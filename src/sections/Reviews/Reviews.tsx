import { Container } from "../../components/layout/Container/Container";
import { Carousel } from "../../components/ui/Carousel/Carousel";
import { Button } from "../../components/ui/Button/Button";
import { SectionHeading } from "../../components/ui/SectionHeading/SectionHeading";
import { ReviewCard } from "./ReviewCard";
import { reviews, reviewsContent } from "./reviews.data";
import style from "./Reviews.module.scss";

export const Reviews = ({ carousel = false }: { carousel?: boolean }) => {
  const cards = reviews.map((review) => (
    <ReviewCard key={review.author} {...review} />
  ));
  return (
    <section id="reviews" className={style.section}>
      <Container>
        <div className={style.content}>
          <SectionHeading
            eyebrow={reviewsContent.eyebrow}
            title={reviewsContent.title}
            className={style.header}
          />

          {carousel ? (
            <Carousel label="Opinie klientów" mobileOnly>
              {cards}
            </Carousel>
          ) : (
            <div className={style.list}>{cards}</div>
          )}

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
