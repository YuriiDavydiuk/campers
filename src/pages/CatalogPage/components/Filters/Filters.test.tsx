import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getCamperFilters } from '../../../../services/campersService';
import { availableFilters } from '../../../../test/fixtures';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import type { FilterFormValues } from '../../../../types/filters';
import Filters from './Filters';

jest.mock('../../../../services/campersService');

const mockedGetCamperFilters = jest.mocked(getCamperFilters);
const emptyValues: FilterFormValues = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

describe('Filters', () => {
  beforeEach(() => {
    mockedGetCamperFilters.mockReset();
  });

  test('shows the loading state', () => {
    mockedGetCamperFilters.mockImplementation(() => new Promise(() => undefined));

    renderWithProviders(<Filters values={emptyValues} onSubmit={jest.fn()} onReset={jest.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading filters...');
  });

  test('shows the error state', async () => {
    mockedGetCamperFilters.mockRejectedValue(new Error('Failed'));

    renderWithProviders(<Filters values={emptyValues} onSubmit={jest.fn()} onReset={jest.fn()} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Failed to load filters.');
  });

  test('renders API options and submits selected filters', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    mockedGetCamperFilters.mockResolvedValue(availableFilters);

    renderWithProviders(
      <Filters values={emptyValues} onSubmit={handleSubmit} onReset={jest.fn()} />
    );

    await screen.findByRole('radio', { name: 'panel van' });
    await user.type(screen.getByLabelText('Location'), 'Kyiv');
    await user.click(screen.getByRole('radio', { name: 'panel van' }));
    await user.click(screen.getByRole('radio', { name: 'diesel' }));
    await user.click(screen.getByRole('radio', { name: 'manual' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      location: 'Kyiv',
      form: 'panel_van',
      engine: 'diesel',
      transmission: 'manual',
    });
  });

  test('calls onReset when filters are cleared', async () => {
    const user = userEvent.setup();
    const handleReset = jest.fn();
    mockedGetCamperFilters.mockResolvedValue(availableFilters);

    renderWithProviders(
      <Filters values={emptyValues} onSubmit={jest.fn()} onReset={handleReset} />
    );

    await screen.findByRole('button', { name: 'Clear filters' });
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
