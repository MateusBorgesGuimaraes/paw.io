import { api } from "../../../services/api";

export interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  title: string;
}

export async function login(data: LoginInput) {
  const response = await api.post<LoginResponse>("/auth/login", data);

  return response.data;
}
