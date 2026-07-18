import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetExam } from "../types";

export async function getPetExams(petId: number) {
  const response = await api.get<PetExam[]>(`/exams/pet/${petId}`);
  return response.data;
}

export const getPetExamsQuery = (petId: number) => {
  return queryOptions({
    queryKey: ["getPetExams", petId],
    queryFn: () => getPetExams(petId),
  });
};
