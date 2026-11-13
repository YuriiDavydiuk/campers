import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NoCampersFound from './NoCampersFound';

describe('NoCampersFound', () => {
  test('renders the empty state and clears filters from both actions', async () => {
    const user = userEvent.setup();
    const handleClearFilters = jest.fn();

    render(<NoCampersFound onClearFilters={handleClearFilters} />);

    expect(screen.getByRole('heading', { name: 'No campers found' })).toBeInTheDocument();
    expect(screen.getByText(/couldn't find any campers/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    await user.click(screen.getByRole('button', { name: 'View all campers' }));

    expect(handleClearFilters).toHaveBeenCalledTimes(2);
  });
});
