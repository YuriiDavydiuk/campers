import spinnerIcon from '../../assets/loading-spinner.png';
import css from './Loading.module.css';

export default function Loading() {
  return (
    <div className={css.overlay}>
      <div className={css.card} role="status" aria-live="polite">
        <img src={spinnerIcon} alt="" className={css.spinner} />

        <div className={css.text}>
          <p className={css.title}>Loading tracks...</p>

          <p className={css.description}>
            Please wait while we fetch the best
            <br />
            travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
}
