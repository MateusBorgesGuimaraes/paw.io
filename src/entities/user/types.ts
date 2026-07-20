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
