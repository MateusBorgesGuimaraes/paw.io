import { useParams } from "@tanstack/react-router"
import { useForm } from "react-hook-form";
import { editPetSchema, type EditPetSchema } from "../../schemas/edit-pet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import styles from './EditPetForm.module.css'
import { Input } from "../../../../components/form/Input";
import { Select } from "../../../../components/form/Select";
import { ToggleGroup } from "../../../../components/form/ToggleGroup";
import { InputMask } from "../../../../components/form/InputMask";
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { useGetPet } from "../../../../entities/pet/api/hooks/useGetPet";
import { useEditPet } from "../../../../entities/pet/api/hooks/useEditPet";
import { speciesItems } from "../../../../entities/pet/especies";

export const EditPetForm = () => {
  const { id } = useParams({ from: '/_authenticated/pets/$id/edit' });
  const { data, error, isPending } = useGetPet(Number(id));

  const { register, handleSubmit, reset, formState: {errors}} = useForm<EditPetSchema>({
    resolver: zodResolver(editPetSchema)
  })

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        species: data.species,
        breed: data.breed,
        weight: data.weight,
        is_neutered: data.is_neutered === 1 ? "1" : "0",
        microchip: data.microchip,
        status: data.status,
      })
    }
  }, [data, reset])

  const { mutate, isPending: isSaving } = useEditPet(Number(id));

  const onSubmit = (formData: EditPetSchema) => {
    mutate(formData)
  }
  if (isPending) return <p>Carregando...</p>

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>
        <Input
          label="Nome do pet"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />

        <Select
          label="Espécie"
          options={speciesItems}
          error={errors.species?.message}
          {...register("species")}
        />
      </div>

      <div className={styles.inputContainer}>
        <Input
          label="Raça"
          type="text"
          error={errors.breed?.message}
          {...register("breed")}
        />

        <Input
          label="Peso"
          type="number"
          step="0.01"
          error={errors.weight?.message}
          {...register("weight" , { valueAsNumber: true })}
        />
      </div>

      <div className={styles.inputContainer}>
      <ToggleGroup
        label="Castrado?"
        options={[
          { label: "Sim", value: "1" },
          { label: "Não", value: "0" },
        ]}
        error={errors.is_neutered?.message}
        {...register("is_neutered")}
        />

        <InputMask
          label="Microchip"
          format="###############"
          placeholder="Ex: 981000000000000"
          mask="_"
          type="text"
          error={errors.microchip?.message}
          {...register("microchip")}
        />
      </div>

      {error && (
        <p className={styles.err}>Dados inválidos. Tente novamente.</p>
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
