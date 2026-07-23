import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { AppointmentListItem } from "../types";

export interface AppointmentResponse {
  data: AppointmentListItem[];
  total: number;
}

export async function getAppointment(
  search: string = "",
  page: number = 1,
): Promise<AppointmentResponse> {
  const response = await api.get<AppointmentListItem[]>(
    `/appointments?s=${encodeURIComponent(search)}&page=${page}`,
  );

  const total = Number(response.headers["x-total-count"] ?? 0);

  return { data: response.data, total };
}

export const getAppointmentQuery = (search: string = "", page: number = 1) => {
  return queryOptions({
    queryKey: ["getAppointment", search, page],
    queryFn: () => getAppointment(search, page),
  });
};
