import { useQuery } from "@tanstack/react-query";
import { getOwnerQuery } from "../api/getOwner";

export function useGetOwner(id: number) {
  return useQuery(getOwnerQuery(id));
}
