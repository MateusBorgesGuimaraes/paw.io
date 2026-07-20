import { createFileRoute } from '@tanstack/react-router'
import { UserPage } from '../../../features/users/pages/UserPage'

export const Route = createFileRoute('/_authenticated/users/')({
  component: UserPage,
  beforeLoad: () => ({
    page: { title: "Usuarios", subtitle: "Gerencie os usuarios cadastrados" },
  }),
})
