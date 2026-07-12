import { api } from "../../../services/api";

export async function toggleOwnerStatus(id: number) {
  const response = await api.patch<{ title: string; }>(`/owners/${id}/status`)
  return response.data;
}
