import { useQuery } from "@tanstack/react-query";
import { getPetVaccinesQuery } from "../api/getPetVaccines";

export function useGetPetVaccines(id: number) {
  return useQuery(getPetVaccinesQuery(id))
}
