import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { Appointment } from "../types";

export async function getAppointments(id: number) {
  const response = await api.get<Appointment[]>(`/owners/${id}/appointments`);
  return response.data;
}


export const getAppointmentsQuery = (id: number) => {
  return queryOptions({
    queryKey: ["getAppointments", id],
    queryFn: () => getAppointments(id)
  })
}
