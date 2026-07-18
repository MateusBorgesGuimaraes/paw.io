import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { OwnerTable } from "../types";

export interface OwnersResponse {
  data: OwnerTable[];
  total: number;
}

export async function getOwners(
  search: string = "",
  page: number = 1,
): Promise<OwnersResponse> {
  const response = await api.get<OwnerTable[]>(
    `/owners?s=${encodeURIComponent(search)}&page=${page}`,
  );

  const total = Number(response.headers["x-total-count"] ?? 0);

  return { data: response.data, total };
}

export const getOwnersQuery = (search: string = "", page: number = 1) => {
  return queryOptions({
    queryKey: ["getOwners", search, page],
    queryFn: () => getOwners(search, page),
  });
};
