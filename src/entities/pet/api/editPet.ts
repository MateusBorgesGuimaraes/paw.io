import { api } from "../../../services/api";
import type { EditPet } from "../types";

export async function editPet(id: number, data: EditPet) {
  const response = await api.patch<{ title: string }>(`/pets/${id}`, data);
  return response.data;
}
