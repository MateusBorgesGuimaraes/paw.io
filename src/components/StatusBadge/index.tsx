import { Badge } from "../Badge";
import { appointmentStatusMap, examStatusMap, paymentStatusMap, petStatusMap, treatmentStatusMap } from "../../entities/owner/statusMap";
import type { AppointmentStatus, PaymentStatus, PetStatus } from "../../entities/owner/types";
import type { ExamStatus, TreatmentStatus } from "../../entities/pet/types";

type StatusBadgeProps =
  | { type: "appointment"; status: AppointmentStatus }
  | { type: "payment"; status: PaymentStatus }
  | { type: "pet"; status: PetStatus }
  | { type: "exam"; status: ExamStatus }
  | { type: "treatment"; status: TreatmentStatus };

const maps = {
  appointment: appointmentStatusMap,
  payment: paymentStatusMap,
  pet: petStatusMap,
  exam: examStatusMap,
  treatment: treatmentStatusMap,
} as const;

export function StatusBadge({ type, status }: StatusBadgeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = (maps[type] as Record<string, { label: string; variant: any }>)[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
