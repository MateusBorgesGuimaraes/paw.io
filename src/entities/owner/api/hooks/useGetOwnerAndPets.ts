import { useQuery } from "@tanstack/react-query";
import { getOwnerAndPetsQuery } from "../getOwnerAndPets";

export function useGetOwnerAndPets(id: number) {
  return useQuery(getOwnerAndPetsQuery(id));
}
