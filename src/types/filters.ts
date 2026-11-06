import type { Camper } from './camper';

export interface CamperFiltersResponse {
  forms: Camper['form'][];
  transmissions: Camper['transmission'][];
  engines: Camper['engine'][];
}

export type FilterFormValues = {
  location: string;
  form: Camper['form'] | '';
  engine: Camper['engine'] | '';
  transmission: Camper['transmission'] | '';
};
