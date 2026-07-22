import { createFileRoute } from '@tanstack/react-router'
import { ViewUserPage } from '../../../../features/users/pages/ViewUserPage'

export const Route = createFileRoute('/_authenticated/users/$id/')({
  component: ViewUserPage,
  beforeLoad: () => ({
    page: { title: "Visualizar Usuario", subtitle: "Visualize as informações principais de um usuario" },
  }),
})
