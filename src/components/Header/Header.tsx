import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import logo from '../../assets/logo.svg';
import css from './Header.module.css';

export default function Header() {
  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    clsx(css.navLink, { [css.active]: isActive });

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <NavLink to="/" className={css.logo}>
          <img src={logo} alt="TravelTrucks" />
        </NavLink>

        <nav className={css.nav} aria-label="Main navigation">
          <ul className={css.navList}>
            <li>
              <NavLink to="/" end className={getNavLinkClassName}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" className={getNavLinkClassName}>
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
