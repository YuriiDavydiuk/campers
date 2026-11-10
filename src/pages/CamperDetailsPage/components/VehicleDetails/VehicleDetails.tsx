import FeatureBadge from '../../../../components/FeatureBadge/FeatureBadge';
import css from './VehicleDetails.module.css';

interface VehicleDetailsProps {
  features: string[];
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
}

export default function VehicleDetails({
  features,
  form,
  length,
  width,
  height,
  tank,
  consumption,
}: VehicleDetailsProps) {
  const details = [
    { label: 'Form', value: form },
    { label: 'Length', value: length },
    { label: 'Width', value: width },
    { label: 'Height', value: height },
    { label: 'Tank', value: tank },
    { label: 'Consumption', value: consumption },
  ];

  return (
    <section className={css.vehicleDetails} aria-labelledby="vehicle-details-title">
      <div className={css.featuresSection}>
        <h2 id="vehicle-details-title" className={css.title}>
          Vehicle details
        </h2>

        <ul className={css.badges}>
          {features.map(feature => (
            <li key={feature}>
              <FeatureBadge label={feature} />
            </li>
          ))}
        </ul>
      </div>

      <hr className={css.divider} />

      <dl className={css.info}>
        {details.map(detail => (
          <div key={detail.label} className={css.infoRow}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
