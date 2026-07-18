import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetActiveTreatment } from "../types";

export async function getPetTreatmentHistory(petId: number) {
  const response = await api.get<PetActiveTreatment[]>(
    `/treatments/pet/${petId}/history`
  );
  return response.data;
}

export const getPetTreatmentHistoryQuery = (petId: number) => {
  return queryOptions({
    queryKey: ["getPetTreatmentHistory", petId],
    queryFn: () => getPetTreatmentHistory(petId),
  });
};
