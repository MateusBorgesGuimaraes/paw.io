import { useCurrentUser } from "./useCurrentUser";

type Role = "admin" | "receptionist" | "veterinarian";

export function usePermission(...roles: Role[]) {
  const { data } = useCurrentUser();
  if (!data) return false;
  return roles.includes(data.role as Role);
}
