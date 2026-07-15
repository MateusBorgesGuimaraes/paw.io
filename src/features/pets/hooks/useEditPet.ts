import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { EditPetSchema } from "../schemas/edit-pet.schema"
import { editPet } from "../api/editPet"

export const useEditPet = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditPetSchema) => editPet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPet", id] });
      toast.success("Pet atualizado com sucesso!")
    },
    onError: () => {
          toast.error("Erro ao atualizar Pet. Tente novamente.")
    },
  })
}
