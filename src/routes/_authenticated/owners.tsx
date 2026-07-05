import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/owners")({
  component: RouteComponent,
  beforeLoad: () => ({
    page: { title: "Tutores", subtitle: "Gerencie os tutores cadastrados" },
  }),
});

function RouteComponent() {
  return <div>Hello "/_authenticated/owners"!</div>;
}
