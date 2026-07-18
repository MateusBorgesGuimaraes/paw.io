import { useQuery } from "@tanstack/react-query";
import { getAppointmentsQuery } from "../getAppointments";

export function useGetAppointments(id: number) {
  return useQuery(getAppointmentsQuery(id));
}
