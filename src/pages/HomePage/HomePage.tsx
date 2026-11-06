import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <div className={css.text}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.description}>You can find everthing in our catalog</p>
        </div>
        <Link to="/catalog" className={css.button}>
          View Now
        </Link>
      </div>
    </section>
  );
}
