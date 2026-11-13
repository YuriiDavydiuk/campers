import type {
  BookingResponse,
  Camper,
  CamperDetails,
  CamperReview,
  CampersResponse,
} from '../types/camper';
import type { CamperFiltersResponse } from '../types/filters';

export const camper: Camper = {
  id: 'camper-1',
  name: 'Mavericks',
  price: 8000,
  rating: 4.8,
  location: 'Ukraine, Kyiv',
  form: 'semi_integrated',
  length: '6.8m',
  width: '2.3m',
  height: '3.2m',
  tank: '160l',
  consumption: '22l/100km',
  transmission: 'automatic',
  engine: 'diesel',
  amenities: ['ac', 'kitchen'],
  coverImage: 'mavericks-cover.jpg',
  totalReviews: 2,
};

export const secondCamper: Camper = {
  ...camper,
  id: 'camper-2',
  name: 'Road Bear',
  form: 'alcove',
  engine: 'petrol',
  coverImage: 'road-bear-cover.jpg',
  totalReviews: 1,
};

export const camperDetails: CamperDetails = {
  id: camper.id,
  name: camper.name,
  price: camper.price,
  rating: camper.rating,
  totalReviews: camper.totalReviews,
  location: camper.location,
  description: 'A comfortable camper for memorable trips.',
  form: camper.form,
  length: camper.length,
  width: camper.width,
  height: camper.height,
  tank: camper.tank,
  consumption: camper.consumption,
  transmission: camper.transmission,
  engine: camper.engine,
  amenities: camper.amenities,
  gallery: [
    {
      id: 'image-1',
      camperId: camper.id,
      thumb: 'mavericks-thumb-1.jpg',
      original: 'mavericks-original-1.jpg',
      order: 1,
    },
    {
      id: 'image-2',
      camperId: camper.id,
      thumb: 'mavericks-thumb-2.jpg',
      original: 'mavericks-original-2.jpg',
      order: 2,
    },
  ],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export const reviews: CamperReview[] = [
  {
    id: 'review-1',
    camperId: camper.id,
    reviewer_name: 'alice',
    reviewer_rating: 4,
    comment: 'A comfortable camper for a family trip.',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
];

export const availableFilters: CamperFiltersResponse = {
  forms: ['alcove', 'panel_van', 'integrated', 'semi_integrated'],
  transmissions: ['automatic', 'manual'],
  engines: ['diesel', 'petrol', 'hybrid', 'electric'],
};

export const firstCampersPage: CampersResponse = {
  page: 1,
  perPage: 4,
  total: 2,
  totalPages: 2,
  campers: [camper],
};

export const secondCampersPage: CampersResponse = {
  page: 2,
  perPage: 4,
  total: 2,
  totalPages: 2,
  campers: [secondCamper],
};

export const bookingResponse: BookingResponse = {
  message: 'Booking request accepted.',
};
