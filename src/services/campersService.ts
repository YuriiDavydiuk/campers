import apiClient from '../api/apiClient';
import type {
  Camper,
  CampersResponse,
  CamperReview,
  CamperDetails,
  BookingRequest,
  BookingResponse,
} from '../types/camper';
import type { CamperFiltersResponse } from '../types/filters';

export async function getCampers(
  params: {
    page?: number;
    perPage?: number;
    location?: string;
    form?: Camper['form'];
    transmission?: Camper['transmission'];
    engine?: Camper['engine'];
  } = {}
): Promise<CampersResponse> {
  const res = await apiClient.get<CampersResponse>('/campers', {
    params: {
      perPage: 4,
      ...params,
    },
  });
  return res.data;
}

export async function getCamperFilters(): Promise<CamperFiltersResponse> {
  const res = await apiClient.get<CamperFiltersResponse>('/campers/filters');

  return res.data;
}

export async function getCamperById(camperId: string): Promise<CamperDetails> {
  const res = await apiClient.get<CamperDetails>(`/campers/${camperId}`);
  return res.data;
}

export async function getCamperReviews(camperId: string): Promise<CamperReview[]> {
  const res = await apiClient.get<CamperReview[]>(`/campers/${camperId}/reviews`);
  return res.data;
}

export async function createBookingRequest(
  camperId: string,
  data: BookingRequest
): Promise<BookingResponse> {
  const res = await apiClient.post<BookingResponse>(`/campers/${camperId}/booking-requests`, data);

  return res.data;
}
