import { useQuery } from "@tanstack/react-query";
import { dashboardQuery } from "../api/getDashboardData";

export function useDashboard() {
  return useQuery(dashboardQuery());
}
