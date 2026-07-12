import { createFileRoute, redirect } from '@tanstack/react-router'
import { ViewOwnerPage } from '../../../../features/owners/pages/ViewOwnerPage'
import type { CurrentUser } from '../../../../features/auth/api/me';
import { permissions } from '../../../../utils/permissions';
import type { UserRoles } from '../../../../utils/types';

export const Route = createFileRoute('/_authenticated/owners/$id/')({
  component: ViewOwnerPage,
  beforeLoad: ({context}) => {
      const user = context.queryClient.getQueryData<CurrentUser>(["me"]);
      if (!user || !permissions.manageOwners.includes(user.role as UserRoles)) {
        console.log('user', user);
          throw redirect({ to: "/dashboard" });
      }
      return {
        page: { title: "Visualizar tutor", subtitle: "Visualiza as informações gerais do tutor" },
      }
    },
})
