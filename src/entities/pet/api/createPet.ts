import { api } from "../../../services/api";
import type { CreatePet } from "../types";

export interface CreatePetPayload extends Omit<CreatePet, "is_neutered"> {
  is_neutered: 0 | 1;
}

export async function createPet(data: CreatePetPayload) {
  const response = await api.post("/pets", data);
  return response.data;
}
