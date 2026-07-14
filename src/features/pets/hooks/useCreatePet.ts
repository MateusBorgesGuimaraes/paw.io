import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPet } from "../api/createPet";
import { toast } from "sonner";

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPets"] });
      toast.success("Pet cadastrado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao cadastrar pet.");
    },
  });
}
