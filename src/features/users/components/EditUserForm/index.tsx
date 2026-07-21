import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "@tanstack/react-router"
import { editUserSchema, type EditUserSchema } from "../../schemas/edit-user.schema"
import { Input } from "../../../../components/form/Input"
import { ButtonLink } from "../../../../components/form/ButtonLink"
import { useGetUser } from "../../../../entities/user/api/hooks/useGetUser"
import { useEditUser } from "../../../../entities/user/api/hooks/useEditUser"
import styles from "./EditUserForm.module.css"

export const EditUserForm = () => {
  const { id } = useParams({ from: "/_authenticated/users/$id/edit" })

  const { data, error, isPending } = useGetUser(Number(id))

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
  })

  useEffect(() => {
    if (data) {
      reset({
        role: data.role,
        name: data.name,
        email: data.email,
        ...(data.role === "veterinarian"
          ? { crmv: data.crmv, specialty: data.specialty }
          : {}),
      })
    }
  }, [data, reset])

  const role = useWatch({ control, name: "role" })
  const isVet = role === "veterinarian"

  const { mutate, isPending: isSaving } = useEditUser(Number(id))

  const onSubmit = (formData: EditUserSchema) => {
    mutate(formData)
  }

  const vetErrors = errors as typeof errors & {
    crmv?: { message?: string }
    specialty?: { message?: string }
  }

  if (isPending) return <p>Carregando...</p>

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={styles.inputContainer}>
        <Input
          label="Nome completo"
          placeholder="Ex: João Silva"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="Ex: joao@clinica.com"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {isVet && (
        <div className={styles.inputContainer}>
          <Input
            label="CRMV"
            placeholder="Ex: MG-12345"
            type="text"
            error={vetErrors.crmv?.message}
            {...register("crmv" as never)}
          />
          <Input
            label="Especialidade"
            placeholder="Ex: Clínica geral"
            type="text"
            error={vetErrors.specialty?.message}
            {...register("specialty" as never)}
          />
        </div>
      )}

      {error && (
        <p className={styles.err}>Erro ao carregar os dados. Tente novamente.</p>
      )}

      <div className={styles.buttonsContainer}>
        <ButtonLink type="button" onClick={() => reset()} variant="default">
          Cancelar
        </ButtonLink>
        <ButtonLink variant="success" type="submit">
          {isSaving ? "Salvando..." : "Salvar mudanças"}
        </ButtonLink>
      </div>
    </form>
  )
}
