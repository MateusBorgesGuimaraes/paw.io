import { useQuery } from "@tanstack/react-query";
import { currentUserQuery } from "../me";


export function useCurrentUser() {
  return useQuery(currentUserQuery());
}
