import { useQuery } from "@tanstack/react-query";
import { getOwnersQuery } from "../getOwners";


export function useGetOwnersBoolean(
  search: string = "",
  page: number = 1,
  enabled: boolean = true,
) {
  return useQuery({ ...getOwnersQuery(search, page), enabled });
}
