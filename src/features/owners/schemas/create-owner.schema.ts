import { z } from "zod";

export const createOwnerSchema = z.object({
  name: z.string().min(3, "O nome deve ser completo"),
  cpf: z.string().optional(),
  phone: z.string().min(8, "O numero deve ser brasileiro"),
  email: z.email().optional(),
  address: z.string().optional(),

})

export type CreateOwnerSchema = z.infer<typeof createOwnerSchema>;
