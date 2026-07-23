import type { AppointmentStatus } from "../appointment/types";
import type { Gender, PetStatus } from "../pet/types";

export type OwnerTable = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  cpf?: string;
  is_active: number;
};

export type CreateOwner = {
  name: string;
  email?: string;
  phone: string;
  cpf?: string;
  address?: string;
};

export type EditOwner = Partial<CreateOwner>

export type Owner = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  cpf?: string;
  address?: string;
  is_active: number;
}

export type PaymentStatus = 'pending' | 'paid' | 'cancelled' | 'refunded'
export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'cash' | 'bank_transfer' | 'health_plan'
export type TreatmentStatus = 'active'| 'completed'| 'cancelled'

export type Pet = {
  id: number,
  name: string,
  species: string,
  breed: string,
  birth_date: string;
  status: PetStatus
}


export type OwnerAndPets = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  cpf?: string;
  is_active: number;
  pets: Pet[];
}

export type Appointment = {
  appointment_id: number,
  vet_id: number,
  scheduled_at: string,
  reason: string,
  notes?: string,
  status: AppointmentStatus,
  created_at: string,
  vet_name: string,
  crmv: string,
  specialty: string,
  pet_id: number,
  pet_name: string,
  species: string,
  breed: string,
  gender: Gender,
  weight: number,
  birth_date: string,
  is_neutered: number,
  pet_status: PetStatus,
  owner_id: number,
  owner_name: string,
  owner_phone: string,
  owner_email?: string,
  payment_status?: PaymentStatus,
  payment_value?: number,
  payment_method?: PaymentMethod,
  has_medical_record?: number,
  medical_record_id?: number
}
