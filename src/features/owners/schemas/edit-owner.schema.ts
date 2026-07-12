import { z } from "zod"
import { createOwnerSchema } from "./create-owner.schema"

export const editOwnerSchema = createOwnerSchema.partial()

export type EditOwnerSchema = z.infer<typeof editOwnerSchema>
