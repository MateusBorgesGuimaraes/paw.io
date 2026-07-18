import { useQuery } from "@tanstack/react-query";
import { getPetsQuery } from "../getPets";

export function useGetPets(search: string = "", page: number = 1) {
  return useQuery(getPetsQuery(search, page));
}
