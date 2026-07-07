export type Status =
  "scheduled" | "in_progress" | "completed" | "cancelled" | "no_show";

type BadgeVariant =
  "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export const statusVariantMap: Record<Status, BadgeVariant> = {
  scheduled: "info",
  in_progress: "primary",
  completed: "success",
  cancelled: "danger",
  no_show: "warning",
};

export const statusLabelMap: Record<Status, string> = {
  scheduled: "Agendada",
  in_progress: "Em andamento",
  completed: "Concluída",
  cancelled: "Cancelada",
  no_show: "Não compareceu",
};

export type DashboardAppointment = {
  appointment_id: number;
  scheduled_at: string;
  pet_name: string;
  vet_name: string;
  status: Status;
};

type WeekDay = {
  date: string;
  appointments: DashboardAppointment[];
};

type MonthlyRevenue = {
  month: string;
  total: number;
};

export type DashboardData = {
  appointments_today: number;
  completed_today: number;
  vaccines_due_7d: number;
  pending_exams: number;
  revenue_this_month: number;
  revenue_last_month: number;
  revenue_change_pct: number;
  monthly_revenue: MonthlyRevenue[];
  upcoming_appointments: DashboardAppointment[];
  week_schedule: WeekDay[];
};
