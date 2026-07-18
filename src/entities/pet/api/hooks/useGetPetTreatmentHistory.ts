import { useQuery } from "@tanstack/react-query";
import { getPetTreatmentHistoryQuery } from "../getPetTreatmentHistory";

export function useGetPetTreatmentHistory(petId: number) {
  return useQuery(getPetTreatmentHistoryQuery(petId));
}
