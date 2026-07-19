import {
  HandCoinsIcon,
  HospitalIcon,
  StethoscopeIcon,
  SyringeIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  Line,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Rectangle,
  type BarRectangleItem,
} from "recharts";

import { Box } from "../../../../components/Box";
import styles from "./DashboardPage.module.css";
import { useDashboard } from "../../hooks/useDashboard";
import { SimpleTable, type Column } from "../../../../components/SimpleTable";
import {type DashboardAppointment} from "../../utils/types";
import { StatusBadge } from "../../../../components/StatusBadge";
const COLORS = ["var(--color-primary)", "var(--color-success)"];

export const DashboardPage = () => {
  const { data, isPending, error } = useDashboard();

  if (isPending) return <p>Carregando...</p>;

  if (error) return <p>Erro ao carregar dashboard.</p>;

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  });

  const appointmentsChartData =
    data?.week_schedule.map((day) => ({
      day: formatter.format(new Date(day.date)).replace(".", ""),
      consultas: day.appointments.length,
    })) ?? [];

  const revenueChartData =
    data?.monthly_revenue.map((item) => ({
      month: item.month,
      receita: item.total,
    })) ?? [];

  const columns: Column<DashboardAppointment>[] = [
    {
      header: "Horário",
      accessor: (row) =>
        new Date(row.scheduled_at).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    },
    { header: "Pet", accessor: (row) => row.pet_name },
    { header: "Veterinário", accessor: (row) => row.vet_name },
    {
      header: "Status",
      accessor: (row) => (
        <StatusBadge type="appointment" status={row.status}  />
      ),
    },
  ];

  return (
    <section className={styles.dashboardLayout}>
      <div className={styles.topHome}>
        <Box>
          <div className={styles.cardContainer}>
            <div className={styles.infosCard}>
              <p className={styles.topCard}>Consultas hoje</p>
              <p className={styles.middleCard}>{data?.appointments_today}</p>
              <p className={styles.bottomCard}>
                {data?.completed_today} concluidas
              </p>
            </div>
            <div className={styles.iconCard}>
              <HospitalIcon size={20} />
            </div>
          </div>
        </Box>

        <Box>
          <div className={styles.cardContainer}>
            <div className={styles.infosCard}>
              <p className={styles.topCard}>Receita do mês</p>
              <p className={styles.middleCard}>{data?.revenue_this_month}</p>
              <p className={styles.bottomCard}>{data?.revenue_change_pct}%+</p>
            </div>
            <div className={styles.iconCard}>
              <HandCoinsIcon size={20} />
            </div>
          </div>
        </Box>

        <Box>
          <div className={styles.cardContainer}>
            <div className={styles.infosCard}>
              <p className={styles.topCard}>Vacinas vencendo</p>
              <p className={styles.middleCard}>{data?.vaccines_due_7d}</p>
              <p className={styles.bottomCard}>Próximos 7 dias</p>
            </div>
            <div className={styles.iconCard}>
              <SyringeIcon size={20} />
            </div>
          </div>
        </Box>

        <Box>
          <div className={styles.cardContainer}>
            <div className={styles.infosCard}>
              <p className={styles.topCard}>Exames pendentes</p>
              <p className={styles.middleCard}>{data?.pending_exams}</p>
              <p className={styles.bottomCard}>Aguardando resultado</p>
            </div>
            <div className={styles.iconCard}>
              <StethoscopeIcon size={20} />
            </div>
          </div>
        </Box>
      </div>
      <div className={styles.charts}>
        <div>
          <Box>
            <div className={styles.chartsBox}>
              <h4>Consultas por dia</h4>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%">
                  <BarChart data={appointmentsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="consultas"
                      shape={(props: BarRectangleItem) => {
                        const { originalDataIndex, ...rest } = props;
                        return (
                          <Rectangle
                            {...rest}
                            radius={[6, 6, 0, 0]}
                            fill={COLORS[originalDataIndex % 2]}
                          />
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Box>

          <Box>
            <div className={styles.chartsBox}>
              <h4>Receita mensal</h4>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="receita"
                      stroke="var(--color-success)"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Box>
        </div>
        <div className={styles.tableContainer}>
          <Box>
            <h4>Próximas consultas</h4>
            <SimpleTable
              columns={columns}
              data={data.upcoming_appointments}
              getRowKey={(row) => row.appointment_id}
            />
          </Box>
        </div>
      </div>
    </section>
  );
};
