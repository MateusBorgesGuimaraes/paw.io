export type PetStatus = 'active'| 'inactive'| 'deceased';

export type PetTable = {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  weight: number;
  birth_date: string;
  is_neutered: number;
  status: PetStatus;
  owner_name: string;
  owner_phone: string;
}

export type FullPet = {
  id: number;
  owner_id: number,
  name: string,
  species: string,
  breed: string,
  gender: string,
  weight: number,
  birth_date: string,
  is_neutered: number,
  microchip?: string,
  status: PetStatus,
  created_at: string,
  updated_at: string,
  owner_name: string,
  owner_phone: string,
  owner_email?: string,
  owner_address?: string,
  last_appointment?: string,
  next_appointment?: string,
  next_vaccine: string
}
