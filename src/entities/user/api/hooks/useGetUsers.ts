import { useQuery } from "@tanstack/react-query";
import { getUsersQuery } from "../getUsers";

export function useGetUsers(search: string = "", page: number = 1) {
  return useQuery(getUsersQuery(search, page));
}
