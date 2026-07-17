import { useQuery } from "@tanstack/react-query";
import { getPetActiveTreatmentsQuery } from "../api/getPetActiveTreatments";

export function useGetPetActiveTreatments(petId: number) {
  return useQuery(getPetActiveTreatmentsQuery(petId));
}
