import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CatalogPage from '../../pages/CatalogPage/CatalogPage';
import { getCamperFilters, getCampers } from '../../services/campersService';
import { availableFilters, camper, firstCampersPage, secondCampersPage } from '../fixtures';
import { renderWithProviders } from '../renderWithProviders';

jest.mock('../../services/campersService');

const mockedGetCampers = jest.mocked(getCampers);
const mockedGetCamperFilters = jest.mocked(getCamperFilters);

describe('CatalogPage integration', () => {
  beforeEach(() => {
    mockedGetCampers.mockReset();
    mockedGetCamperFilters.mockReset();
    mockedGetCamperFilters.mockResolvedValue(availableFilters);
  });

  test('shows loading and then renders campers', async () => {
    let resolveCampers: (value: typeof firstCampersPage) => void = () => undefined;
    mockedGetCampers.mockImplementation(() => new Promise(resolve => (resolveCampers = resolve)));

    renderWithProviders(<CatalogPage />, { route: '/catalog' });

    expect(screen.getByText('Loading tracks...')).toBeInTheDocument();

    resolveCampers(firstCampersPage);

    expect(await screen.findByRole('heading', { name: camper.name })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument();
  });

  test('shows the request error', async () => {
    mockedGetCampers.mockRejectedValue(new Error('Failed'));

    renderWithProviders(<CatalogPage />, { route: '/catalog' });

    expect(await screen.findByRole('alert')).toHaveTextContent('Failed to load campers.');
  });

  test('shows an empty result and restores all campers after clearing filters', async () => {
    const user = userEvent.setup();
    mockedGetCampers.mockImplementation(async params => {
      if (params?.form === 'panel_van') {
        return {
          page: 1,
          perPage: 4,
          total: 0,
          totalPages: 0,
          campers: [],
        };
      }

      return { ...firstCampersPage, totalPages: 1 };
    });

    renderWithProviders(<CatalogPage />, { route: '/catalog' });

    await screen.findByRole('heading', { name: camper.name });
    await user.click(screen.getByRole('radio', { name: 'panel van' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByRole('heading', { name: 'No campers found' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'View all campers' }));

    expect(await screen.findByRole('heading', { name: camper.name })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'panel van' })).not.toBeChecked();
  });

  test('keeps active filters when loading the next page', async () => {
    const user = userEvent.setup();
    mockedGetCampers.mockImplementation(async params =>
      params?.page === 2 ? secondCampersPage : firstCampersPage
    );

    renderWithProviders(<CatalogPage />, { route: '/catalog' });

    await screen.findByRole('heading', { name: camper.name });
    await user.type(screen.getByLabelText('Location'), ' Kyiv ');
    await user.click(screen.getByRole('radio', { name: 'panel van' }));
    await user.click(screen.getByRole('radio', { name: 'diesel' }));
    await user.click(screen.getByRole('radio', { name: 'manual' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(mockedGetCampers).toHaveBeenCalledWith({
        page: 1,
        location: 'Kyiv',
        form: 'panel_van',
        engine: 'diesel',
        transmission: 'manual',
      });
    });

    await user.click(screen.getByRole('button', { name: 'Load more' }));

    expect(await screen.findByRole('heading', { name: 'Road Bear' })).toBeInTheDocument();
    expect(mockedGetCampers).toHaveBeenLastCalledWith({
      page: 2,
      location: 'Kyiv',
      form: 'panel_van',
      engine: 'diesel',
      transmission: 'manual',
    });
  });

  test('hides Load more when there is no next page', async () => {
    mockedGetCampers.mockResolvedValue({ ...firstCampersPage, totalPages: 1 });

    renderWithProviders(<CatalogPage />, { route: '/catalog' });

    await screen.findByRole('heading', { name: camper.name });
    expect(screen.queryByRole('button', { name: 'Load more' })).not.toBeInTheDocument();
  });
});
