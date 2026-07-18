import { api } from "../../../services/api"
import type { EditOwner } from "../types"

export async function editOwner(id: number, data: EditOwner) {
  const response = await api.patch<{ title: string }>(`/owners/${id}`, data)
  return response.data
}
