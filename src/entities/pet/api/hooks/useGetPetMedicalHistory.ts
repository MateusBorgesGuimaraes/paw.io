import { useQuery } from "@tanstack/react-query";
import { getPetMedicalHistoryQuery } from "../getPetMedicalHistory";

export function useGetPetMedicalHistory(id: number) {
  return useQuery(getPetMedicalHistoryQuery(id))
}
