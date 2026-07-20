import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../services/api";

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.patch("/auth/user/status", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      queryClient.invalidateQueries({ queryKey: ["getVeterinarians"] });
    },
  });
}
