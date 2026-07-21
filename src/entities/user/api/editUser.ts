import type { EditUserSchema } from "../../../features/users/schemas/edit-user.schema"
import { api } from "../../../services/api"

export async function editUser(id: number, data: EditUserSchema) {
  const response = await api.patch<{ title: string }>("/auth/user", {
    id,
    ...data,
  })
  return response.data
}
