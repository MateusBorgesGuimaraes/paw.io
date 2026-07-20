import { useQuery } from "@tanstack/react-query";
import { getVeterinariansQuery } from "../getVeterinarians";

export function useGetVeterinarians(search: string = "", page: number = 1) {
  return useQuery(getVeterinariansQuery(search, page));
}
