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

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CamperDetails extends Omit<Camper, 'coverImage'> {
  description: string;
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
}

export type AmenityKey =
  'ac' | 'bathroom' | 'kitchen' | 'tv' | 'radio' | 'refrigerator' | 'microwave' | 'gas' | 'water';

export interface BookingRequest {
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}
