import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import CamperDetailsPage from '../../pages/CamperDetailsPage/CamperDetailsPage';
import {
  createBookingRequest,
  getCamperById,
  getCamperReviews,
} from '../../services/campersService';
import { bookingResponse, camperDetails, reviews } from '../fixtures';
import { renderWithProviders } from '../renderWithProviders';

jest.mock('../../services/campersService');
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
jest.mock('swiper/modules', () => ({ FreeMode: {}, Thumbs: {} }));

const mockedGetCamperById = jest.mocked(getCamperById);
const mockedGetCamperReviews = jest.mocked(getCamperReviews);
const mockedCreateBookingRequest = jest.mocked(createBookingRequest);

function renderDetailsPage(route = '/catalog/camper-1') {
  return renderWithProviders(
    <Routes>
      <Route path="/catalog/:id" element={<CamperDetailsPage />} />
    </Routes>,
    { route }
  );
}

describe('CamperDetailsPage integration', () => {
  beforeEach(() => {
    mockedGetCamperById.mockReset();
    mockedGetCamperReviews.mockReset();
    mockedCreateBookingRequest.mockReset();
  });

  test('loads camper details and reviews by route id', async () => {
    mockedGetCamperById.mockResolvedValue(camperDetails);
    mockedGetCamperReviews.mockResolvedValue(reviews);

    renderDetailsPage();

    expect(await screen.findByRole('heading', { name: camperDetails.name })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Mavericks view 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vehicle details' })).toBeInTheDocument();
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Book your campervan now' })).toBeInTheDocument();
    expect(mockedGetCamperById).toHaveBeenCalledWith('camper-1');
    expect(mockedGetCamperReviews).toHaveBeenCalledWith('camper-1');
  });

  test('shows the loading state', () => {
    mockedGetCamperById.mockImplementation(() => new Promise(() => undefined));
    mockedGetCamperReviews.mockImplementation(() => new Promise(() => undefined));

    renderDetailsPage();

    expect(screen.getByText('Loading tracks...')).toBeInTheDocument();
  });

  test('shows the error state when a request fails', async () => {
    mockedGetCamperById.mockRejectedValue(new Error('Failed'));
    mockedGetCamperReviews.mockResolvedValue(reviews);

    renderDetailsPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load camper');
    expect(screen.getByRole('link', { name: 'Back to catalog' })).toHaveAttribute(
      'href',
      '/catalog'
    );
  });

  test('submits a booking for the camper from the route', async () => {
    const user = userEvent.setup();
    mockedGetCamperById.mockResolvedValue(camperDetails);
    mockedGetCamperReviews.mockResolvedValue(reviews);
    mockedCreateBookingRequest.mockResolvedValue(bookingResponse);

    renderDetailsPage();

    await screen.findByRole('heading', { name: camperDetails.name });
    await user.type(screen.getByPlaceholderText('Name*'), 'Alice');
    await user.type(screen.getByPlaceholderText('Email*'), 'alice@example.com');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(mockedCreateBookingRequest).toHaveBeenCalledWith('camper-1', {
        name: 'Alice',
        email: 'alice@example.com',
      });
    });
    expect(await screen.findByRole('status')).toHaveTextContent(bookingResponse.message);
  });
});
