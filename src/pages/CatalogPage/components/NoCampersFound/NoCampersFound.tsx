import closeIcon from '../../../../assets/close-outline.svg';
import noCampersImage from '../../../../assets/no-campers-found.png';
import Button from '../../../../components/Button/Button';
import css from './NoCampersFound.module.css';

interface NoCampersFoundProps {
  onClearFilters: () => void;
}

export default function NoCampersFound({ onClearFilters }: NoCampersFoundProps) {
  return (
    <section className={css.container} aria-labelledby="no-campers-title">
      <img src={noCampersImage} alt="" className={css.image} />

      <div className={css.text}>
        <h2 id="no-campers-title" className={css.title}>
          No campers found
        </h2>

        <p className={css.description}>
          We couldn&apos;t find any campers that match your filters.
          <br />
          Try adjusting your search or clearing some filters.
        </p>
      </div>

      <div className={css.actions}>
        <Button
          type="button"
          variant="secondary"
          className={css.actionButton}
          onClick={onClearFilters}
        >
          <img src={closeIcon} alt="" width={24} height={24} />
          Clear filters
        </Button>

        <Button type="button" className={css.actionButton} onClick={onClearFilters}>
          View all campers
        </Button>
      </div>
    </section>
  );
}
