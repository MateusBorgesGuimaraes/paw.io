import { api } from "../../../services/api";
import type { CreatePetSchema } from "../schemas/create-pet.schema";

export interface CreatePetPayload extends Omit<CreatePetSchema, "is_neutered"> {
  is_neutered: 0 | 1;
}

export async function createPet(data: CreatePetPayload) {
  const response = await api.post("/pets", data);
  return response.data;
}
