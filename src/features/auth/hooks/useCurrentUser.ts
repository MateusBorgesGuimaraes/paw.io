import { useQuery } from "@tanstack/react-query";
import { currentUserQuery } from "../api/me";

export function useCurrentUser() {
  return useQuery(currentUserQuery());
}
