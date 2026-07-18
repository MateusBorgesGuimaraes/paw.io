import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editOwner } from "../editOwner"
import { toast } from "sonner"
import type { EditOwner } from "../../types"

export const useEditOwner = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditOwner) => editOwner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOwner", id] });
      toast.success("Tutor atualizado com sucesso!")
    },
    onError: () => {
          toast.error("Erro ao atualizar tutor. Tente novamente.")
    },
  })
}
