import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { EditOwnerSchema } from "../schemas/edit-owner.schema"
import { editOwner } from "../api/editOwner"
import { toast } from "sonner"

export const useEditOwner = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditOwnerSchema) => editOwner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOwner", id] });
      toast.success("Tutor atualizado com sucesso!")
    },
    onError: () => {
          toast.error("Erro ao atualizar tutor. Tente novamente.")
    },
  })
}
