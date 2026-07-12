import { api } from "../../../services/api"
import type { EditOwnerSchema } from "../schemas/edit-owner.schema"

export async function editOwner(id: number, data: EditOwnerSchema) {
  const response = await api.patch<{ title: string }>(`/owners/${id}`, data)
  return response.data
}
