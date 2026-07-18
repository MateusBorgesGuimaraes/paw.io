import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { Owner } from "../types";

export async function getOwner(id:number) {
  const response = await api.get<Owner>(`/owners/${id}`);
  return response.data;
}

export const getOwnerQuery = (id: number) => {
  return queryOptions({
    queryKey: ["getOwner", id],
    queryFn: () => getOwner(id)
  })
}
