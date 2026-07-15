import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { FullPet } from "../utils/types";

export async function getPet(id: number) {
  const response = await api.get<FullPet>(`/pets/${id}`);
  return response.data;
}

export const getPetQuery = (id: number) => {
  return queryOptions({
    queryKey: ["getPet", id],
    queryFn: () => getPet(id)
  })
}
