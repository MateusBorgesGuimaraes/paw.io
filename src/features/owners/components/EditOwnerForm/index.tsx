import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/form/Input";
import styles from './EditOwnerForm.module.css'
import { InputMask } from "../../../../components/form/InputMask";
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { useParams } from "@tanstack/react-router";
import { useGetOwner } from "../../hooks/useGetOwner";
import { editOwnerSchema, type EditOwnerSchema } from "../../schemas/edit-owner.schema";
import { useEffect } from "react";
import { useEditOwner } from "../../hooks/useEditOwner";

export const EditOwnerForm = () => {
  const { id } = useParams({ from: '/_authenticated/owners/$id/edit' });
  const { data, error, isPending } = useGetOwner(Number(id));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditOwnerSchema>({
    resolver: zodResolver(editOwnerSchema)
  });

  useEffect(() => {
      if (data) {
        reset({
          name: data.name,
          email: data.email ?? undefined,
          cpf: data.cpf ?? undefined,
          phone: data.phone,
          address: data.address ?? undefined,
        })
      }
    }, [data, reset])


  const { mutate, isPending: isSaving } = useEditOwner(Number(id))

  const onSubmit = (formData: EditOwnerSchema) => {
    mutate(formData)
  }

  if (isPending) return <p>Carregando...</p>
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>

      <Input
        label="Nome completo"
        placeholder="Ex: Mari da Silva Santos"
        type="text"
        error={errors.name?.message}
        {...register("name")}
        />

        <Input
          label="Email"
          placeholder="Ex: seuemai@email.com"
          type="email"
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
        <p className={styles.err}>Erro ao carregar os dados. Tente novamente.</p>
      )}
      <div className={styles.buttonsContainer}>
        <ButtonLink type="button" onClick={() => reset()} variant="default">
          Cancelar
        </ButtonLink>
        <ButtonLink variant="success" type="submit">
          {isSaving ? (
            "Salvando..."
          ) : (
            <>
                Salvar mudanças
            </>
          )}
        </ButtonLink>
      </div>
    </form>
  )
}
