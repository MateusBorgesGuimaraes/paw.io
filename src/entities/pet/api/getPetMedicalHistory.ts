import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetMedicalHistory } from "../types";

export async function getPetMedicalHistory(id: number) {
  const response = await api.get<PetMedicalHistory[]>(`/medical-records/pet/${id}/history`);

  return response.data;
}


export const getPetMedicalHistoryQuery = (id: number) => {
  return queryOptions({
    queryKey: ["getPetMedicalHistory", id],
    queryFn: () => getPetMedicalHistory(id)
  })
}
