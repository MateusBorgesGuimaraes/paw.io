import { useQuery } from "@tanstack/react-query";
import { getPetQuery } from "../getPet";

export function useGetPet(id: number) {
  return useQuery(getPetQuery(id))
}
