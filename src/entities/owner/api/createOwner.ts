import { api } from "../../../services/api";
import type { CreateOwner } from "../types";


interface CreateOwnerResponse {
  id: number;
  title: string;
}

export async function createOwner(data: CreateOwner) {
  const response = await api.post<CreateOwnerResponse>("/owners", data);

  return response.data
}
