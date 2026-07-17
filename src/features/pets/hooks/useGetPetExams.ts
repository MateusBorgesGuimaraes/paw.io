import { useQuery } from "@tanstack/react-query";
import { getPetExamsQuery } from "../api/getPetExams";

export function useGetPetExams(petId: number) {
  return useQuery(getPetExamsQuery(petId));
}
