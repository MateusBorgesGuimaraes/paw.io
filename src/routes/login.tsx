import { createFileRoute, redirect } from "@tanstack/react-router";
import { currentUserQuery } from "../features/auth/api/me";
import { LoginPage } from "../features/auth/pages/LoginPage";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(currentUserQuery());

      throw redirect({
        to: "/dashboard",
      });
    } catch {
      // Não autenticado: permanece na tela de login
    }
  },

  component: LoginPage,
});
