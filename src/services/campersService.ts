import apiClient from '../api/apiClient';
import type { Camper, CampersResponse } from '../types/camper';
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
