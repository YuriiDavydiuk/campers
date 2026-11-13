import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';

import { camper, secondCamper } from '../../../../test/fixtures';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import CamperCard from './CamperCard';

describe('CamperCard', () => {
  test('renders camper information, formatted features and details link', () => {
    renderWithProviders(<CamperCard camper={camper} />);

    expect(screen.getByRole('heading', { name: 'Mavericks' })).toBeInTheDocument();
    expect(screen.getByText('€8000')).toBeInTheDocument();
    expect(screen.getByText('4.8(2 Reviews)')).toBeInTheDocument();
    expect(screen.getByText('Ukraine, Kyiv')).toBeInTheDocument();
    expect(screen.getByText('diesel')).toBeInTheDocument();
    expect(screen.getByText('automatic')).toBeInTheDocument();
    expect(screen.getByText('semi integrated')).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Mavericks' })).toHaveAttribute(
      'src',
      camper.coverImage
    );
    expect(screen.getByRole('link', { name: 'Show more about Mavericks' })).toHaveAttribute(
      'href',
      '/catalog/camper-1'
    );
  });

  test('uses the singular review label for one review', () => {
    renderWithProviders(<CamperCard camper={secondCamper} />);

    expect(screen.getByText('4.8(1 Review)')).toBeInTheDocument();
  });
});
