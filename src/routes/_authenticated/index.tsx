import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
  beforeLoad: () => ({
    page: { title: "Dashborad", subtitle: "Visão geral da clínica" },
  }),
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
