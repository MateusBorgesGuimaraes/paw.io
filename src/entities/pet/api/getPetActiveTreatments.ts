import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetActiveTreatment } from "../types";

export async function getPetActiveTreatments(petId: number) {
  const response = await api.get<PetActiveTreatment[]>(`/treatments/pet/${petId}`);
  return response.data;
}

export const getPetActiveTreatmentsQuery = (petId: number) => {
  return queryOptions({
    queryKey: ["getPetActiveTreatments", petId],
    queryFn: () => getPetActiveTreatments(petId),
  });
};
