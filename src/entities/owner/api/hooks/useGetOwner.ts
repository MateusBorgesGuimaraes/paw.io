import { useQuery } from "@tanstack/react-query";
import { getOwnerQuery } from "../getOwner";

export function useGetOwner(id: number) {
  return useQuery(getOwnerQuery(id));
}
