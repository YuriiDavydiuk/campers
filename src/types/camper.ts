export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: 'automatic' | 'manual';
  engine: 'diesel' | 'petrol' | 'hybrid' | 'electric';
  amenities: AmenityKey[];
  coverImage: string;
  totalReviews: number;
}

export type AmenityKey =
  'ac' | 'bathroom' | 'kitchen' | 'tv' | 'radio' | 'refrigerator' | 'microwave' | 'gas' | 'water';
