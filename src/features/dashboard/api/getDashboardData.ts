import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { DashboardData } from "../utils/types";

export async function getDashboardData() {
  const response = await api.get<DashboardData>("/dashboard");

  return response.data;
}

export const dashboardQuery = () =>
  queryOptions({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
