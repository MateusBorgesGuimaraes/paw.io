import { api } from "../../../services/api"
import type { UserProfile } from "../types"

export async function getUser(id: number) {
  const response = await api.get<UserProfile>(`/auth/users/${id}`)
  return response.data
}
