import { api } from "../../../services/api";

export async function logout() {
  const response = await api.delete("/auth/logout");

  return response.data;
}
