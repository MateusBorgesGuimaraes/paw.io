import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { editUser } from "../editUser"
import type { EditUserSchema } from "../../../../features/users/schemas/edit-user.schema"

export const useEditUser = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditUserSchema) => editUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] })
      queryClient.invalidateQueries({ queryKey: ["getVeterinarians"] })
      toast.success("Usuário atualizado com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao atualizar usuário. Tente novamente.")
    },
  })
}
