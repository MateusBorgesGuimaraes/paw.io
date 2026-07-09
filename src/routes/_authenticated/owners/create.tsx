import { createFileRoute, redirect } from '@tanstack/react-router'
import { CreateOwnerPage } from '../../../features/owners/pages/CreateOwnerPage'
import type { CurrentUser } from '../../../features/auth/api/me'
import { permissions } from '../../../utils/permissions'
import type { UserRoles } from '../../../utils/types'

export const Route = createFileRoute('/_authenticated/owners/create')({
  component: CreateOwnerPage,
  beforeLoad: ({context}) => {
    const user = context.queryClient.getQueryData<CurrentUser>(["me"]);
      if(!user || permissions.manageOwners.includes(user.role as UserRoles)) {
        throw redirect({ to: "/dashboard" });
    }
    return {
      page: { title: "Novo tutor", subtitle: "Preencha os dados para cadastrar um novo tutor" },
    }
  },
})
