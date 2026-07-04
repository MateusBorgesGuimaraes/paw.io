import { createFileRoute, redirect } from "@tanstack/react-router";
import { currentUserQuery } from "../../features/auth/api/me";
import { AuthLayout } from "../../components/layouts/AuthLayout";

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
