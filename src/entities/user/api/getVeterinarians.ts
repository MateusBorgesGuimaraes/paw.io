import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { VeterinarianTable } from "../types";

export interface VeterinariansResponse {
  data: VeterinarianTable[];
  total: number;
}

export async function getVeterinarians(
  search: string = "",
  page: number = 1,
): Promise<VeterinariansResponse> {
  const response = await api.get<VeterinarianTable[]>(
    `/auth/users/veterinarians/search?s=${encodeURIComponent(search)}&page=${page}`,
  );
  const total = Number(response.headers["x-total-count"] ?? 0);
  return { data: response.data, total };
}

export const getVeterinariansQuery = (
  search: string = "",
  page: number = 1,
) => {
  return queryOptions({
    queryKey: ["getVeterinarians", search, page],
    queryFn: () => getVeterinarians(search, page),
  });
};
