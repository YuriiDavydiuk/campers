import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/renderWithProviders';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('renders the 404 message and catalog link', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to catalog' })).toHaveAttribute(
      'href',
      '/catalog'
    );
  });
});
