import { useQuery } from "@tanstack/react-query";
import { getOwnersQuery } from "../../owners/api/getOwners";


export function useGetOwners(
  search: string = "",
  page: number = 1,
  enabled: boolean = true,
) {
  return useQuery({ ...getOwnersQuery(search, page), enabled });
}
