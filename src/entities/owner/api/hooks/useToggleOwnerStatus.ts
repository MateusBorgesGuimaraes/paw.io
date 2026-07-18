import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleOwnerStatus } from "../toggleOwnerStatus";
import { toast } from "sonner";

export const useToggleOwnerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => toggleOwnerStatus(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["getOwner", id] });
      queryClient.invalidateQueries({ queryKey: ["getOwners"] });
      toast.success("Status alterado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar status.");
    },
  });
};
