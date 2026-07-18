import { useQuery } from "@tanstack/react-query";
import { getPetVaccinesQuery } from "../getPetVaccines";

export function useGetPetVaccines(id: number) {
  return useQuery(getPetVaccinesQuery(id))
}
