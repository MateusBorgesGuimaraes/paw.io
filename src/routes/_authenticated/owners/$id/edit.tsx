import { createFileRoute, redirect } from '@tanstack/react-router'
import { EditOwnerPage } from '../../../../features/owners/pages/EditOwnerPage'
import { permissions } from '../../../../utils/permissions';
import type { UserRoles } from '../../../../utils/types';
import type { CurrentUser } from '../../../../entities/auth/api/me';

export const Route = createFileRoute('/_authenticated/owners/$id/edit')({
  component: EditOwnerPage,
  beforeLoad: ({ context }) => {
    const user = context.queryClient.getQueryData<CurrentUser>(["me"]);
    if (!user || !permissions.manageOwners.includes(user.role as UserRoles)) {
        throw redirect({ to: "/dashboard" });
    }
    return {
      page: { title: "Editar tutor", subtitle: "Edite os dados gerais do tutor" },
    }
  }
})
