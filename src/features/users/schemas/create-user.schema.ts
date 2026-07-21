import { z } from "zod"

const baseSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
})

export const createUserSchema = z.discriminatedUnion("role", [
  baseSchema.extend({
    role: z.literal("admin"),
  }),
  baseSchema.extend({
    role: z.literal("receptionist"),
  }),
  baseSchema.extend({
    role: z.literal("veterinarian"),
    crmv: z.string().min(1, "CRMV é obrigatório"),
    specialty: z.string().min(1, "Especialidade é obrigatória"),
  }),
])

export type CreateUserSchema = z.infer<typeof createUserSchema>
