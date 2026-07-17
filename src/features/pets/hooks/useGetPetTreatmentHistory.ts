import { useQuery } from "@tanstack/react-query";
import { getPetTreatmentHistoryQuery } from "../api/getPetTreatmentHistory";

export function useGetPetTreatmentHistory(petId: number) {
  return useQuery(getPetTreatmentHistoryQuery(petId));
}
