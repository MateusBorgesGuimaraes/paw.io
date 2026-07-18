import { createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { currentUserQuery } from "../../entities/auth/api/me";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    console.log("beforeLoad executou");
    try {
      await context.queryClient.ensureQueryData(currentUserQuery());
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: AuthLayout,
});
