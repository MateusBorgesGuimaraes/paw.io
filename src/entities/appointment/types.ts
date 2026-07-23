import type { PaymentMethod, PaymentStatus } from "../owner/types";
import type { Gender, PetStatus } from "../pet/types";

export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "in_progress";

interface AppointmentView {
  appointment_id: number;
  vet_id: number;
  scheduled_at: string; // "YYYY-MM-DD HH:mm:ss"
  reason: string;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;

  vet_name: string;
  crmv: string;
  specialty: string;

  pet_id: number;
  pet_name: string;
  species: string;
  breed: string;
  gender: Gender;
  weight: number;
  birth_date: string; // "YYYY-MM-DD"
  is_neutered: 0 | 1;
  pet_status: PetStatus;

  owner_id: number;
  owner_name: string;
  owner_phone: string;
  owner_email: string;

  payment_status: PaymentStatus | null;
  payment_value: number | null;
  payment_method: PaymentMethod | null;

  has_medical_record: 0 | 1;
  medical_record_id: number | null;
}

export type AppointmentListItem = AppointmentView & { total: number };
