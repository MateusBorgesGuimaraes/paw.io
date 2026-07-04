import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../api/logout";
import { useNavigate } from "@tanstack/react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });
}
