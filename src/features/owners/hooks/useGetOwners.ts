import { useQuery } from "@tanstack/react-query";
import { getOwnersQuery } from "../api/getOwners";

export function useGetOwners(search: string = "", page: number = 1) {
  return useQuery(getOwnersQuery(search, page));
}
