import type { CamperReview } from '../../../../types/camper';
import css from './Reviews.module.css';

interface ReviewsProps {
  reviews: CamperReview[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <ul className={css.list}>
      {reviews.map(review => (
        <li key={review.id} className={css.review}>
          <div className={css.person}>
            <span className={css.avatar} aria-hidden="true">
              {review.reviewer_name.charAt(0).toUpperCase()}
            </span>

            <div className={css.reviewer}>
              <p className={css.name}>{review.reviewer_name}</p>

              <div
                className={css.rating}
                role="img"
                aria-label={`${review.reviewer_rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <span
                    key={starIndex}
                    className={`${css.star} ${starIndex < review.reviewer_rating ? css.starFilled : ''}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
