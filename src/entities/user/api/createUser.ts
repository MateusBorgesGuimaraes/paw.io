import type { CreateUserSchema } from "../../../features/users/schemas/create-user.schema"
import { api } from "../../../services/api"

interface CreateUserResponse {
  title: string
}

export async function createUser(data: CreateUserSchema) {
  const response = await api.post<CreateUserResponse>("/auth/user", data)
  return response.data
}
