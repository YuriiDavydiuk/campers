import { describe, expect, test } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';

import { camperDetails } from '../../../../test/fixtures';
import VehicleDetails from './VehicleDetails';

describe('VehicleDetails', () => {
  test('renders features and semantic vehicle details', () => {
    render(
      <VehicleDetails
        features={['automatic', 'diesel', 'kitchen']}
        form="semi integrated"
        length={camperDetails.length}
        width={camperDetails.width}
        height={camperDetails.height}
        tank={camperDetails.tank}
        consumption={camperDetails.consumption}
      />
    );

    expect(screen.getByRole('heading', { name: 'Vehicle details' })).toBeInTheDocument();
    expect(screen.getByText('automatic')).toBeInTheDocument();
    expect(screen.getByText('diesel')).toBeInTheDocument();
    expect(screen.getByText('kitchen')).toBeInTheDocument();

    const details = screen.getByText('Form').parentElement;
    expect(details).not.toBeNull();
    expect(within(details!).getByRole('definition')).toHaveTextContent('semi integrated');
    expect(screen.getAllByRole('term')).toHaveLength(6);
    expect(screen.getAllByRole('definition')).toHaveLength(6);
  });
});
