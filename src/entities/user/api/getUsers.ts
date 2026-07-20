import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { UserTable } from "../types";

export interface UsersResponse {
  data: UserTable[];
  total: number;
}

export async function getUsers(
  search: string = "",
  page: number = 1,
): Promise<UsersResponse> {
  const response = await api.get<UserTable[]>(
    `/auth/users/search?s=${encodeURIComponent(search)}&page=${page}`,
  );
  const total = Number(response.headers["x-total-count"] ?? 0);
  return { data: response.data, total };
}

export const getUsersQuery = (search: string = "", page: number = 1) => {
  return queryOptions({
    queryKey: ["getUsers", search, page],
    queryFn: () => getUsers(search, page),
  });
};
