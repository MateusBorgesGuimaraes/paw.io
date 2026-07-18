import { useQuery } from "@tanstack/react-query";
import { getPetAppointmentsQuery } from "../getPetAppointments";

export function useGetPetAppointments(petId: number) {
  return useQuery(getPetAppointmentsQuery(petId));
}
