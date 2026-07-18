import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { currentUserQuery } from "../entities/auth/api/me";

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
