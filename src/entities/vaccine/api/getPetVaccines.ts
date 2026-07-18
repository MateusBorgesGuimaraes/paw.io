import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetVaccine } from "../types";

export async function getPetVaccines(id: number): Promise<PetVaccine[]> {
  const response = await api<PetVaccine[]>(`/vaccines/pet/${id}`);
  return response.data;
}

export const getPetVaccinesQuery = (id: number) => {
  return queryOptions({
    queryKey: ["getPetVaccines", id],
    queryFn: () => getPetVaccines(id)
  })
}
