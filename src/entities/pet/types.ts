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

export type CreatePet = {
  owner_id: number;
  name: string;
  species: string;
  breed?: string;
  gender: "M" | "F";
  weight: number;
  birth_date: string;
  is_neutered: "0" | "1";
  microchip?: string;
};

export type EditPet = Partial<CreatePet>

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


export type MedicalRecordData = {
  id: number;
  appointment_id: number;
  symptoms: string;
  diagnosis: string;
  observations?: string;
  created_at: string;
  updated_at: string;
};

export type ExamStatus =
  "requested" | "in_progress" | "completed" | "cancelled";

export type ExamData = {
  id: number;
  pet_id: number;
  medical_record_id: number;
  exam_name: string;
  result?: string;
  status: ExamStatus;
  request_date: string;
  updated_at: string;
};

export type TreatmentStatus = "active" | "completed" | "cancelled";

export type TreatmentData = {
  id: number;
  pet_id: number;
  medical_record_id: number;
  description: string;
  start_date: string;
  end_date: string;
  status: TreatmentStatus;
};

export type PrescriptionData = {
  id: number;
  medical_record_id: number;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  created_at: string;
};

export type PetMedicalHistory = {
  appointment_id: number;
  scheduled_at: string;
  reason: string;
  appointment_status: string;
  vet_name: string;
  specialty: string;
  medical_record_id: number;
  symptoms: string | null;
  diagnosis: string | null;
  observations: string | null;
  pet_id: number;
  pet_name: string;
  species: string;
  breed: string;
  owner_name: string;
  owner_phone: string;
};

export type PetExam = {
  exam_id: number;
  exam_name: string;
  exam_status: ExamStatus;
  result: string | null;
  request_date: string;
  updated_at: string;
  pet_id: number;
  pet_name: string;
  species: string;
  owner_name: string;
  diagnosis: string;
  consultation_date: string;
  vet_name: string;
};

export type PetActiveTreatment = {
  treatment_id: number;
  description: string;
  start_date: string;
  end_date: string;
  status: TreatmentStatus;
  pet_id: number;
  pet_name: string;
  species: string;
  owner_name: string;
  owner_phone: string;
  vet_name: string;
  consultation_date: string;
};

export type AppointmentStatus =
  "scheduled" | "in_progress" | "completed" | "cancelled" | "no_show";

export type PetAppointment = {
  appointment_id: number;
  scheduled_at: string;
  reason: string;
  status: AppointmentStatus;
  notes?: string;
  vet_name: string;
  pet_id: number;
};
