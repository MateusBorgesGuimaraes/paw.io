import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { PetTable } from "../utils/types";

export interface PetsResponse {
  data: PetTable[];
  total: number;
}

export async function getPets(search: string = "", page: number = 1): Promise<PetsResponse> {
  const response = await api.get<PetTable[]>(`/pets?s=${encodeURIComponent(search)}&page=${page}`);

  const total = Number(response.headers["x-total-count"] ?? 0);

  return { data: response.data, total };
}

export const getPetsQuery = (search: string = "", page: number = 1) => {
  return queryOptions({
    queryKey: ["getPets", search, page],
    queryFn: () => getPets(search, page)
  })
}
