import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import apiClient from '../api/apiClient';
import {
  availableFilters,
  bookingResponse,
  camperDetails,
  firstCampersPage,
  reviews,
} from '../test/fixtures';
import {
  createBookingRequest,
  getCamperById,
  getCamperFilters,
  getCamperReviews,
  getCampers,
} from './campersService';

jest.mock('../api/apiClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedGet = apiClient.get as unknown as jest.MockedFunction<
  (url: string, config?: unknown) => Promise<{ data: unknown }>
>;
const mockedPost = apiClient.post as unknown as jest.MockedFunction<
  (url: string, data?: unknown) => Promise<{ data: unknown }>
>;

describe('campersService', () => {
  beforeEach(() => {
    mockedGet.mockReset();
    mockedPost.mockReset();
  });

  test('gets campers with the default page size', async () => {
    mockedGet.mockResolvedValue({ data: firstCampersPage });

    await expect(getCampers()).resolves.toEqual(firstCampersPage);
    expect(mockedGet).toHaveBeenCalledWith('/campers', {
      params: { perPage: 4 },
    });
  });

  test('forwards camper filters and allows overriding the page size', async () => {
    mockedGet.mockResolvedValue({ data: firstCampersPage });

    await getCampers({
      page: 2,
      perPage: 3,
      location: 'Kyiv',
      form: 'semi_integrated',
      transmission: 'automatic',
      engine: 'diesel',
    });

    expect(mockedGet).toHaveBeenCalledWith('/campers', {
      params: {
        perPage: 3,
        page: 2,
        location: 'Kyiv',
        form: 'semi_integrated',
        transmission: 'automatic',
        engine: 'diesel',
      },
    });
  });

  test('gets available camper filters', async () => {
    mockedGet.mockResolvedValue({ data: availableFilters });

    await expect(getCamperFilters()).resolves.toEqual(availableFilters);
    expect(mockedGet).toHaveBeenCalledWith('/campers/filters');
  });

  test('gets a camper by id', async () => {
    mockedGet.mockResolvedValue({ data: camperDetails });

    await expect(getCamperById('camper-1')).resolves.toEqual(camperDetails);
    expect(mockedGet).toHaveBeenCalledWith('/campers/camper-1');
  });

  test('gets camper reviews', async () => {
    mockedGet.mockResolvedValue({ data: reviews });

    await expect(getCamperReviews('camper-1')).resolves.toEqual(reviews);
    expect(mockedGet).toHaveBeenCalledWith('/campers/camper-1/reviews');
  });

  test('creates a booking request', async () => {
    const request = { name: 'Alice', email: 'alice@example.com' };
    mockedPost.mockResolvedValue({ data: bookingResponse });

    await expect(createBookingRequest('camper-1', request)).resolves.toEqual(bookingResponse);
    expect(mockedPost).toHaveBeenCalledWith('/campers/camper-1/booking-requests', request);
  });
});
