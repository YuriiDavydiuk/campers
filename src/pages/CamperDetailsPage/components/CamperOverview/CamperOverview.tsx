import starIcon from '../../../../assets/star.svg';
import mapIcon from '../../../../assets/map.svg';
import css from './CamperOverview.module.css';

interface CamperOverviewProps {
  name: string;
  rating: number;
  totalReviews: number;
  location: string;
  price: number;
  description: string;
}

export default function CamperOverview({
  name,
  rating,
  totalReviews,
  location,
  price,
  description,
}: CamperOverviewProps) {
  const formattedPrice = price.toLocaleString('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    useGrouping: false,
  });

  return (
    <section className={css.overview}>
      <div className={css.heading}>
        <h1 className={css.title}>{name}</h1>

        <div className={css.details}>
          <div className={css.meta}>
            <span className={css.metaItem}>
              <img src={starIcon} alt="" width={16} height={16} />
              <span>
                {rating}({totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'})
              </span>
            </span>

            <span className={css.metaItem}>
              <img src={mapIcon} alt="" width={16} height={16} />
              <span>{location}</span>
            </span>
          </div>

          <p className={css.price}>{formattedPrice}</p>
        </div>
      </div>

      <p className={css.description}>{description}</p>
    </section>
  );
}
