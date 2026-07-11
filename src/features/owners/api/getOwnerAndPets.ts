import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { OwnerAndPets } from "../utils/types";

export async function getOwnerAndPets(id:number) {
  const response = await api.get<OwnerAndPets>(`/owners/${id}`);
  return response.data;
}

export const getOwnerAndPetsQuery = (id: number) => {
  return queryOptions({
    queryKey: ["getOwnerAndPets", id],
    queryFn: () => getOwnerAndPets(id)
  })
}
