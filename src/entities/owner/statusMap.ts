import type { ExamStatus } from "../pet/types";
import type { AppointmentStatus, PaymentStatus, PetStatus, TreatmentStatus } from "./types";

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

type StatusConfig = { label: string; variant: BadgeVariant };

export const appointmentStatusMap: Record<AppointmentStatus, StatusConfig> = {
  scheduled: { label: "Agendado", variant: "info" },
  in_progress: { label: "Em andamento", variant: "primary" },
  completed: { label: "Concluído", variant: "success" },
  cancelled: { label: "Cancelado", variant: "danger" },
  no_show: { label: "Não compareceu", variant: "warning" },
};

export const paymentStatusMap: Record<PaymentStatus, StatusConfig> = {
  pending: { label: "Pendente", variant: "warning" },
  paid: { label: "Pago", variant: "success" },
  cancelled: { label: "Cancelado", variant: "danger" },
  refunded: { label: "Reembolsado", variant: "info" },
};

export const petStatusMap: Record<PetStatus, StatusConfig> = {
  active: { label: "Ativo", variant: "success" },
  inactive: { label: "Inativo", variant: "neutral" },
  deceased: { label: "Falecido", variant: "danger" },
};

export const examStatusMap: Record<ExamStatus, StatusConfig> = {
  requested: { label: "Solicitado", variant: "info" },
  in_progress: { label: "Em andamento", variant: "primary" },
  completed: { label: "Concluído", variant: "success" },
  cancelled: { label: "Cancelado", variant: "danger" },
};


export const treatmentStatusMap: Record<TreatmentStatus, StatusConfig> = {
  active: { label: "Ativo", variant: "primary" },
  completed: { label: "Em andamento", variant: "success" },
  cancelled: { label: "Cancelado", variant: "danger" },
};
