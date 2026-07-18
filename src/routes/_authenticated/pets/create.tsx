import { createFileRoute, redirect } from '@tanstack/react-router'
import { CreatePetPage } from '../../../features/pets/pages/CreatePetPage'
import type { UserRoles } from '../../../utils/types';
import { permissions } from '../../../utils/permissions';
import type { CurrentUser } from '../../../entities/auth/api/me';

export const Route = createFileRoute('/_authenticated/pets/create')({
  component: CreatePetPage,
  beforeLoad: ({context}) => {
    const user = context.queryClient.getQueryData<CurrentUser>(["me"]);
    if (!user || !permissions.manageOwners.includes(user.role as UserRoles)) {
      console.log('user', user);
        throw redirect({ to: "/dashboard" });
    }
    return {
      page: { title: "Cadastrar Pet", subtitle: "Cadastre as informações de um novo pet" },
    }
  },
  })
