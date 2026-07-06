type DashboardAppointment = {
  appointment_id: number;
  scheduled_at: string;
  pet_name: string;
  vet_name: string;
  status: string;
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
