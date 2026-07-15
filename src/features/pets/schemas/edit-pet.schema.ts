import { z } from "zod"
import { createPetSchema } from "./create-pet.schema"

export const editPetSchema = createPetSchema
  .pick({
    name: true,
    species: true,
    breed: true,
    weight: true,
    is_neutered: true,
    microchip: true,
  })
  .partial()
  .extend({
    status: z.enum(["active", "inactive", "deceased"]).optional(),
  })

export type EditPetSchema = z.infer<typeof editPetSchema>
