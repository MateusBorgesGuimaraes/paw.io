
import type { PetStatus } from "./types";

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

type StatusConfig = { label: string; variant: BadgeVariant };

export const petStatusMap: Record<PetStatus, StatusConfig> = {
  active: { label: "Ativo", variant: "success" },
  inactive: { label: "Inativo", variant: "neutral" },
  deceased: { label: "Falecido", variant: "danger" },
};
