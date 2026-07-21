import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createUser } from "../createUser"

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] })
      queryClient.invalidateQueries({ queryKey: ["getVeterinarians"] })
      toast.success("Usuário cadastrado com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao cadastrar usuário.")
    },
  })
}
