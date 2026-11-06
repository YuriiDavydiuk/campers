import { Link } from 'react-router-dom';
import clsx from 'clsx';

import FeatureBadge from '../../../../components/FeatureBadge/FeatureBadge';
import type { Camper } from '../../../../types/camper';

import buttonCss from '../../../../components/Button/Button.module.css';
import starIcon from '../../../../assets/star.svg';
import mapIcon from '../../../../assets/map.svg';
import engineIcon from '../../../../assets/petrol.svg';
import transmissionIcon from '../../../../assets/automatic.svg';
import formIcon from '../../../../assets/alcove.svg';
import css from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const formattedPrice = camper.price.toLocaleString('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    useGrouping: false,
  });

  const features = [
    { icon: engineIcon, label: camper.engine },
    { icon: transmissionIcon, label: camper.transmission },
    { icon: formIcon, label: camper.form.replaceAll('_', ' ') },
  ];
  return (
    <article className={css.card}>
      <img
        src={camper.coverImage}
        alt={camper.name}
        width={219}
        height={240}
        className={css.image}
      />

      <div className={css.info}>
        <div className={css.heading}>
          <div className={css.titleRow}>
            <h2 className={css.title}>{camper.name}</h2>
            <p className={css.price}>{formattedPrice}</p>
          </div>

          <div className={css.details}>
            <span className={css.detail}>
              <img src={starIcon} alt="" width={16} height={16} />
              <span>
                {camper.rating}({camper.totalReviews}{' '}
                {camper.totalReviews === 1 ? 'Review' : 'Reviews'})
              </span>
            </span>

            <span className={css.detail}>
              <img src={mapIcon} alt="" width={16} height={16} />
              <span>{camper.location}</span>
            </span>
          </div>
        </div>

        <ul className={css.features}>
          {features.map(feature => (
            <li key={feature.label}>
              <FeatureBadge icon={feature.icon} label={feature.label} />
            </li>
          ))}
        </ul>

        <Link
          to={`/catalog/${camper.id}`}
          className={clsx(buttonCss.button, buttonCss.primary, css.showMore)}
          aria-label={`Show more about ${camper.name}`}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
