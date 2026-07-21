import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema, type CreateUserSchema } from "../../schemas/create-user.schema"
import { Input } from "../../../../components/form/Input"
import { ButtonLink } from "../../../../components/form/ButtonLink"
import styles from "./CreateUserForm.module.css"
import { useCreateUser } from "../../../../entities/user/api/hooks/useCreateUser"
import { Select, type SelectOption } from "../../../../components/form/Select"

const ROLES: SelectOption[] = [
  { value: "admin", label: "Admin" },
  { value: "receptionist", label: "Recepcionista" },
  { value: "veterinarian", label: "Veterinário" },
]

export const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { role: "receptionist" },
  })

  const role = useWatch({ control, name: "role" })
  const isVet = role === "veterinarian"

  const { mutate, isPending } = useCreateUser()

  const onSubmit = (data: CreateUserSchema) => {
    mutate(data)
    reset()
  }

  const vetErrors = errors as typeof errors & {
    crmv?: { message?: string }
    specialty?: { message?: string }
  }

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
          requerid
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="Ex: joao@clinica.com"
          type="email"
          requerid
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className={styles.inputContainer}>
        <Input
          label="Senha"
          placeholder="Mínimo 8 caracteres"
          type="password"
          requerid
          error={errors.password?.message}
          {...register("password")}
        />

        <Select
          label="Perfil"
          requerid
          placeholder="Selecione um perfil"
          options={ROLES}
          error={errors.role?.message}
          {...register("role")}
        />
      </div>

      {isVet && (
        <div className={styles.inputContainer}>
          <Input
            label="CRMV"
            placeholder="Ex: MG-12345"
            type="text"
            requerid
            error={vetErrors.crmv?.message}
            {...register("crmv" as never)}
          />
          <Input
            label="Especialidade"
            placeholder="Ex: Clínica geral"
            type="text"
            requerid
            error={vetErrors.specialty?.message}
            {...register("specialty" as never)}
          />
        </div>
      )}

      <div className={styles.buttonsContainer}>
        <ButtonLink type="button" onClick={() => reset()} variant="default">
          Cancelar
        </ButtonLink>
        <ButtonLink variant="success" type="submit">
          {isPending ? "Criando..." : "Criar usuário"}
        </ButtonLink>
      </div>
    </form>
  )
}
