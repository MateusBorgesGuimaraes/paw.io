import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function getCurrentUser() {
  const response = await api.get<CurrentUser>("/auth/me");

  return response.data;
}

export const currentUserQuery = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });
