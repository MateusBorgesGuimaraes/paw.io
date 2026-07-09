import { api } from "../../../services/api";
import type { CreateOwnerSchema } from "../schemas/create-owner.schema";

interface CreateOwnerResponse {
  id: number;
  title: string;
}

export async function createOwner(data: CreateOwnerSchema) {
  const response = await api.post<CreateOwnerResponse>("/owners", data);

  return response.data
}
