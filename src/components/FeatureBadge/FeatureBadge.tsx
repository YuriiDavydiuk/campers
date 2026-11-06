import css from './FeatureBadge.module.css';

interface FeatureBadgeProps {
  icon: string;
  label: string;
}

export default function FeatureBadge({ icon, label }: FeatureBadgeProps) {
  return (
    <span className={css.badge}>
      <img src={icon} alt="" width={20} height={20} className={css.icon} />
      <span>{label}</span>
    </span>
  );
}
