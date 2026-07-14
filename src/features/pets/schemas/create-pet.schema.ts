import { z } from "zod";

export const createPetSchema = z.object({
  owner_id: z.number().min(1, "Selecione um tutor"),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  species: z.string().min(1, "Selecione a espécie"),
  breed: z.string().optional(),
  gender: z.enum(["M", "F"], "Selecione o sexo"),
  weight: z.number().positive("O peso deve ser maior que zero"),
  birth_date: z.iso.date("Informe uma data válida"),
  is_neutered: z.enum(["0", "1"], "Selecione se o pet é castrado"),
  microchip: z.string().optional(),
});
export type CreatePetSchema = z.infer<typeof createPetSchema>;
