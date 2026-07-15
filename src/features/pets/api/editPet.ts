import { api } from "../../../services/api";
import type { EditPetSchema } from "../schemas/edit-pet.schema";

export async function editPet(id: number, data: EditPetSchema) {
  const response = await api.patch<{ title: string }>(`/pets/${id}`, data);
  return response.data;
}
