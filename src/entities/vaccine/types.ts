export type PetVaccine = {
  vaccine_id: number;
  vaccine_name: string;
  batch: string | null;
  application_date: string;
  next_dose: string;
  days_until_next_dose: number;
  pet_id: number;
  pet_name: string;
  species: string;
  breed: string;
  pet_status: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string | null;
};
