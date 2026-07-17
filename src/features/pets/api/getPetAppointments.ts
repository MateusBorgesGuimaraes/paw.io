import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetAppointment } from "../utils/types";

export async function getPetAppointments(petId: number) {
  const response = await api.get<PetAppointment[]>(`/appointments/pet/${petId}`);
  return response.data;
}

export const getPetAppointmentsQuery = (petId: number) => {
  return queryOptions({
    queryKey: ["getPetAppointments", petId],
    queryFn: () => getPetAppointments(petId),
  });
};
