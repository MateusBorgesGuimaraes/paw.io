import { queryOptions, useQuery } from "@tanstack/react-query"
import { getUser } from "../getUser"

export const getUserQuery = (id: number) =>
  queryOptions({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  })

export const useGetUser = (id: number) => {
  return useQuery(getUserQuery(id))
}
