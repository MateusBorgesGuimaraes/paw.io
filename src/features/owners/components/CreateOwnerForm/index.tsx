import { useForm } from "react-hook-form"
import { createOwnerSchema, type CreateOwnerSchema } from "../../schemas/create-owner.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/form/Input";
import styles from './CreateOwnerForm.module.css'
import { InputMask } from "../../../../components/form/InputMask";
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { useCreateOwner } from "../../../../entities/owner/api/hooks/useCreateOwner";

export const CreateOwnerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateOwnerSchema>({
    resolver: zodResolver(createOwnerSchema)
  });

  const { mutate, isPending, error } = useCreateOwner();

  const onSubmit = (data: CreateOwnerSchema) => {
    mutate(data)
  }
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>

      <Input
        label="Nome completo"
        placeholder="Ex: Mari da Silva Santos"
        type="text"
        requerid
        error={errors.name?.message}
        {...register("name")}
        />

        <Input
          label="Email"
          placeholder="Ex: seuemai@email.com"
          type="email"
          description="Opcional. Usado para envio de lembretes."
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className={styles.inputContainer}>
        <InputMask
          label="CPF"
          format="###.###.###-##"
          placeholder="000.000.000-00"
          mask="_"
          type="text"
          error={errors.cpf?.message}
          {...register("cpf")}
        />

        <InputMask
          label="Telefone"
          format="(##) #####-####"
          placeholder="(11) 99999-0000"
          mask="_"
          requerid
          type="text"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Input
        label="Endereço"
        placeholder="Ex: Rua Nova Flor, Bairro Floresta, numero 292"
        type="text"
        error={errors.address?.message}
        {...register("address")}
      />
      {error && (
        <p className={styles.err}>Dados inválidos. Tente novamente.</p>
      )}
      <div className={styles.buttonsContainer}>
        <ButtonLink type="button" onClick={() => reset()} variant="default">
          Cancelar
        </ButtonLink>
        <ButtonLink variant="success" type="submit">
          {isPending ? (
            "Criando..."
          ) : (
            <>
                Criar tutor
            </>
          )}
        </ButtonLink>
      </div>
    </form>
  )
}
