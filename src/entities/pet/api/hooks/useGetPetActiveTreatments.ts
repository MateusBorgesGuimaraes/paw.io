import { useQuery } from "@tanstack/react-query";
import { getPetActiveTreatmentsQuery } from "../getPetActiveTreatments";

export function useGetPetActiveTreatments(petId: number) {
  return useQuery(getPetActiveTreatmentsQuery(petId));
}
