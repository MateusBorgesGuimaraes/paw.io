import { createFileRoute } from '@tanstack/react-router'
import { EditUserPage } from '../../../../features/users/pages/EditUserPage'

export const Route = createFileRoute('/_authenticated/users/$id/edit')({
  component: EditUserPage,
  beforeLoad: () => ({
    page: { title: "Editar Usuarios", subtitle: "Edite os usuarios cadastrados" },
  }),
})
