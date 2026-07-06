import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  beforeLoad: () => ({
    page: { title: "Dashborad", subtitle: "Visão geral da clínica" },
  }),
});
