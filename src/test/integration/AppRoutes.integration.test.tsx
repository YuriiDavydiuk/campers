import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import App from '../../App';
import {
  getCamperById,
  getCamperFilters,
  getCamperReviews,
  getCampers,
} from '../../services/campersService';
import { availableFilters, camperDetails, firstCampersPage, reviews } from '../fixtures';
import { renderWithProviders } from '../renderWithProviders';

jest.mock('../../services/campersService');
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
jest.mock('swiper/modules', () => ({ FreeMode: {}, Thumbs: {} }));

const mockedGetCampers = jest.mocked(getCampers);
const mockedGetCamperFilters = jest.mocked(getCamperFilters);
const mockedGetCamperById = jest.mocked(getCamperById);
const mockedGetCamperReviews = jest.mocked(getCamperReviews);

describe('App routes integration', () => {
  beforeEach(() => {
    mockedGetCampers.mockReset();
    mockedGetCamperFilters.mockReset();
    mockedGetCamperById.mockReset();
    mockedGetCamperReviews.mockReset();

    mockedGetCampers.mockResolvedValue({ ...firstCampersPage, totalPages: 1 });
    mockedGetCamperFilters.mockResolvedValue(availableFilters);
    mockedGetCamperById.mockResolvedValue(camperDetails);
    mockedGetCamperReviews.mockResolvedValue(reviews);
  });

  test('renders Home with the shared header', () => {
    renderWithProviders(<App />, { route: '/' });

    expect(screen.getByRole('heading', { name: 'Campers of your dreams' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  test('renders Catalog with the shared header', async () => {
    renderWithProviders(<App />, { route: '/catalog' });

    expect(await screen.findByRole('heading', { name: 'Camper catalog' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Mavericks' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  test('renders Camper details with the shared header', async () => {
    renderWithProviders(<App />, { route: '/catalog/camper-1' });

    expect(await screen.findByRole('heading', { name: 'Mavericks' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vehicle details' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  test('renders NotFoundPage for an unknown route', () => {
    renderWithProviders(<App />, { route: '/unknown-page' });

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });
});
