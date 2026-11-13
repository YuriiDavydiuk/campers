import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { camperDetails } from '../../../../test/fixtures';
import CamperOverview from './CamperOverview';

describe('CamperOverview', () => {
  test('renders camper information and formatted price', () => {
    render(
      <CamperOverview
        name={camperDetails.name}
        rating={camperDetails.rating}
        totalReviews={camperDetails.totalReviews}
        location={camperDetails.location}
        price={camperDetails.price}
        description={camperDetails.description}
      />
    );

    expect(screen.getByRole('heading', { name: 'Mavericks' })).toBeInTheDocument();
    expect(screen.getByText('4.8(2 Reviews)')).toBeInTheDocument();
    expect(screen.getByText('Ukraine, Kyiv')).toBeInTheDocument();
    expect(screen.getByText('€8000')).toBeInTheDocument();
    expect(screen.getByText(camperDetails.description)).toBeInTheDocument();
  });

  test('uses the singular review label for one review', () => {
    render(
      <CamperOverview
        name="Road Bear"
        rating={4.5}
        totalReviews={1}
        location="Ukraine, Lviv"
        price={9000}
        description="Compact camper."
      />
    );

    expect(screen.getByText('4.5(1 Review)')).toBeInTheDocument();
  });
});
