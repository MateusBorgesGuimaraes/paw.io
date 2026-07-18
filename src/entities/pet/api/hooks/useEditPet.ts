import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { editPet } from "../editPet"
import type { EditPet } from "../../types"

export const useEditPet = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditPet) => editPet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPet", id] });
      toast.success("Pet atualizado com sucesso!")
    },
    onError: () => {
          toast.error("Erro ao atualizar Pet. Tente novamente.")
    },
  })
}
