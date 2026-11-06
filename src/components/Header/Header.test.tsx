import '@testing-library/jest-dom/jest-globals';

import { describe, expect, jest, test } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

jest.mock('react-router-dom', () => {
  const { TextDecoder, TextEncoder } = jest.requireActual('node:util') as {
    TextDecoder: typeof globalThis.TextDecoder;
    TextEncoder: typeof globalThis.TextEncoder;
  };
  Object.assign(globalThis, { TextDecoder, TextEncoder });

  return jest.requireActual('react-router-dom');
});

jest.mock('../../assets/logo.svg', () => 'logo.svg');

describe('Header', () => {
  test('renders the logo and navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: 'TravelTrucks' });
    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation',
    });

    const homeLink = within(navigation).getByRole('link', { name: 'Home' });
    const catalogLink = within(navigation).getByRole('link', {
      name: 'Catalog',
    });

    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toContainElement(screen.getByRole('img', { name: 'TravelTrucks' }));

    expect(homeLink).toHaveAttribute('href', '/');
    expect(catalogLink).toHaveAttribute('href', '/catalog');
  });

  test('marks the correct navigation link as active', () => {
    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const catalogLink = screen.getByRole('link', { name: 'Catalog' });

    expect(homeLink).not.toHaveClass('active');
    expect(catalogLink).toHaveClass('active');
    expect(catalogLink).toHaveAttribute('aria-current', 'page');
  });
});
