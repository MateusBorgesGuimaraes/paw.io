import { createFileRoute } from '@tanstack/react-router'
import { AppointmentsPage } from '../../../features/appointments/pages/AppointmentsPage'

export const Route = createFileRoute('/_authenticated/appointments/')({
  component: AppointmentsPage,
  beforeLoad: () => ({
    page: { title: "Consultas", subtitle: "Gerencie as consultas registradas" },
  }),
})
