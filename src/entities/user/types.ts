export interface UserTable {
  id: number;
  name: string;
  email: string;
  role: "admin" | "receptionist" | "veterinarian";
  is_active: number;
  created_at: string;
}

export interface VeterinarianTable {
  id: number;
  name: string;
  email: string;
  is_active: number;
  crmv: string;
  specialty: string;
  created_at: string;
}

export type UserProfile =
  | {
      id: number
      name: string
      email: string
      role: "admin" | "receptionist"
      is_active: number
      created_at: string
      updated_at: string
      crmv: null
      specialty: null
    }
  | {
      id: number
      name: string
      email: string
      role: "veterinarian"
      is_active: number
      created_at: string
      updated_at: string
      crmv: string
      specialty: string
    }
