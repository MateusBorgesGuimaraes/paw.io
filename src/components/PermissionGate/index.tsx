import { usePermission } from "../../features/auth/hooks/usePermission";

type Role = "admin" | "receptionist" | "veterinarian";

interface PermissionGateProps {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGate({
  roles,
  children,
  fallback = null,
}: PermissionGateProps) {
  const allowed = usePermission(...roles);
  return allowed ? <>{children}</> : <>{fallback}</>;
}
