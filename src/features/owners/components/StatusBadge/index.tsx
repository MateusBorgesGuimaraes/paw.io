import { Badge } from "../../../../components/Badge";
import { appointmentStatusMap, paymentStatusMap, petStatusMap } from "../../../../entities/owner/statusMap";
import type { AppointmentStatus, PaymentStatus, PetStatus } from "../../../../entities/owner/types";

type StatusBadgeProps =
  | { type: "appointment"; status: AppointmentStatus }
  | { type: "payment"; status: PaymentStatus }
  | { type: "pet"; status: PetStatus };

const maps = {
  appointment: appointmentStatusMap,
  payment: paymentStatusMap,
  pet: petStatusMap,
} as const;

export function StatusBadge({ type, status }: StatusBadgeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = (maps[type] as Record<string, { label: string; variant: any }>)[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
