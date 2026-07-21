import { z } from "zod"

const baseEditSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
  email: z.email("Email inválido").optional(),
})

export const editUserSchema = z.discriminatedUnion("role", [
  baseEditSchema.extend({ role: z.literal("admin") }),
  baseEditSchema.extend({ role: z.literal("receptionist") }),
  baseEditSchema.extend({
    role: z.literal("veterinarian"),
    crmv: z.string().min(1, "CRMV é obrigatório").optional(),
    specialty: z.string().min(1, "Especialidade é obrigatória").optional(),
  }),
])

export type EditUserSchema = z.infer<typeof editUserSchema>
