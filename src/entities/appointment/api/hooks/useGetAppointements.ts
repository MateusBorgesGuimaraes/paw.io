import { useQuery } from "@tanstack/react-query";
import { getAppointmentQuery } from "../getAppointements";


export function useGetAppointments(search: string = "", page: number = 1) {
  return useQuery(getAppointmentQuery(search, page));
}
