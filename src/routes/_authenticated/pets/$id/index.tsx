import { createFileRoute } from '@tanstack/react-router'
import { ViewPetPage } from '../../../../features/pets/pages/ViewPetPage'

export const Route = createFileRoute('/_authenticated/pets/$id/')({
  component: ViewPetPage,
  beforeLoad: () => ({
    page: { title: "Informaçãoes do Pet", subtitle: "Visualize todos os dados relacionados ao pet" },
  }),
})
