import { createFileRoute } from '@tanstack/react-router'
import { EditPetPage } from '../../../../features/pets/pages/EditPetPage'

export const Route = createFileRoute('/_authenticated/pets/$id/edit')({
  component: EditPetPage,
  beforeLoad: () => ({
    page: { title: "Editar Pet", subtitle: "Edite os dados gerais do pet" },
  }),
})
