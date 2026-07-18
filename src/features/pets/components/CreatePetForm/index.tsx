import { Controller, useForm } from "react-hook-form"
import { createPetSchema, type CreatePetSchema } from "../../schemas/create-pet.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/form/Input";
import { Select } from "../../../../components/form/Select";
import { ToggleGroup } from "../../../../components/form/ToggleGroup";

import styles from './CreatePetForm.module.css'
import { ButtonLink } from "../../../../components/form/ButtonLink";
import { OwnerPicker } from "../OwnerPicker";
import { Box } from "../../../../components/Box";
import { InputMask } from "../../../../components/form/InputMask";
import { useCreatePet } from "../../../../entities/pet/api/hooks/useCreatePet";
import { speciesItems } from "../../../../entities/pet/especies";


export const CreatePetForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreatePetSchema>({
    resolver: zodResolver(createPetSchema)
  });
  const { mutate, isPending, error } = useCreatePet();

  const onSubmit = (data: CreatePetSchema) => {
    mutate({...data, is_neutered: Number(data.is_neutered) as 0 | 1})
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>

      <Box className={styles.picker}>
        <div>
          <Controller
            name="owner_id"
            control={control}
            render={({ field, fieldState }) => (
              <OwnerPicker
                label="Tutor"
                requerid
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </Box>

      <Box className={styles.inputs}>
        <div className={styles.inputContainer}>
          <Input
            label="Nome do pet"
            placeholder="Ex: Thor"
            type="text"
            requerid
            error={errors.name?.message}
            {...register("name")}
          />
          <Select
            label="Espécie"
            placeholder="Selecione a espécie"
            requerid
            options={speciesItems}
            error={errors.species?.message}
            {...register("species")}
          />
        </div>

        <div className={styles.inputContainer}>
          <Input
            label="Raça"
            placeholder="Ex: Golden Retriever"
            type="text"
            error={errors.breed?.message}
            {...register("breed")}
          />
          <Input
            label="Peso (kg)"
            placeholder="Ex: 12.5"
            type="number"
            step="0.01"
            requerid
            error={errors.weight?.message}
            {...register("weight", { valueAsNumber: true })}
          />
        </div>

        <div className={styles.inputContainer}>
          <ToggleGroup
            label="Sexo"
            requerid
            options={[
              { label: "Macho", value: "M" },
              { label: "Fêmea", value: "F" },
            ]}
            error={errors.gender?.message}
            {...register("gender")}
          />
          <ToggleGroup
            label="Castrado?"
            options={[
              { label: "Sim", value: "1" },
              { label: "Não", value: "0" },
            ]}
            error={errors.is_neutered?.message}
            {...register("is_neutered", { valueAsNumber: true })}
          />
        </div>

        <div className={styles.inputContainer}>
          <Input
            label="Data de nascimento"
            type="date"
            requerid
            error={errors.birth_date?.message}
            {...register("birth_date")}
          />
          <InputMask
            label="Microchip"
            format="###############"
            placeholder="Ex: 981000000000000"
            mask="_"
            type="text"
            description="Opcional"
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
            {isPending ? (
              "Criando..."
            ) : (
              <>
                  Criar pet
              </>
            )}
          </ButtonLink>
        </div>
      </Box>
    </form>
  )
}
