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
