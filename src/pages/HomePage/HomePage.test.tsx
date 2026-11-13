import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/renderWithProviders';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders the hero and catalog link', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Campers of your dreams' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Now' })).toHaveAttribute('href', '/catalog');
  });
});
