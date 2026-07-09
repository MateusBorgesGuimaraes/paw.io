import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createOwner } from "../api/createOwner";

export function useCreateOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOwner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owners"] });
      toast.success("Tutor cadastrado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao cadastrar tutor.");
    },
  });
}
