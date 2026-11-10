import clsx from 'clsx';
import { Link } from 'react-router-dom';

import buttonCss from '../../components/Button/Button.module.css';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={css.page} aria-labelledby="not-found-title">
      <div className={css.content}>
        <p className={css.code} aria-hidden="true">
          404
        </p>

        <h1 id="not-found-title" className={css.title}>
          Page not found
        </h1>

        <p className={css.description}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link to="/catalog" className={clsx(buttonCss.button, buttonCss.primary, css.link)}>
          Back to catalog
        </Link>
      </div>
    </section>
  );
}
