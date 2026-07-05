import type { UserRoles } from "./types";

export const permissions = {
  // auth
  searchUsers: ["admin", "receptionist"] as UserRoles[],
  getVeterinarians: ["admin", "receptionist"] as UserRoles[],
  manageUsers: ["admin"] as UserRoles[],

  // owners
  manageOwners: ["admin", "receptionist"] as UserRoles[],
  toggleOwnerStatus: ["admin"] as UserRoles[],

  // pets
  viewPets: ["admin", "receptionist", "veterinarian"] as UserRoles[],
  editPets: ["admin", "veterinarian"] as UserRoles[],

  // appointments
  manageAppointments: ["admin", "receptionist"] as UserRoles[],
  updateAppointmentStatus: ["admin", "veterinarian"] as UserRoles[],

  // medical
  manageMedical: ["admin", "veterinarian"] as UserRoles[],

  // vaccines
  viewVaccines: ["admin", "receptionist", "veterinarian"] as UserRoles[],
  registerVaccine: ["admin", "veterinarian"] as UserRoles[],

  // payments
  managePayments: ["admin", "receptionist"] as UserRoles[],
  manageRevenue: ["admin"] as UserRoles[],
} as const;
