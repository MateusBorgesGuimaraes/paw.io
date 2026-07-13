import { createFileRoute } from '@tanstack/react-router'
import { PetsPage } from '../../../features/pets/pages/PetsPage'

export const Route = createFileRoute('/_authenticated/pets/')({
  component: PetsPage,
  beforeLoad: () => ({
    page: { title: "Pets", subtitle: "Gerencie os pets cadastrados" },
  }),
})
