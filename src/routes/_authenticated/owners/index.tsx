import { createFileRoute } from "@tanstack/react-router";
import { OwnerPage } from "../../../features/owners/pages/OwnerPage";

export const Route = createFileRoute("/_authenticated/owners/")({
  component: OwnerPage,
  beforeLoad: () => ({
    page: { title: "Tutores", subtitle: "Gerencie os tutores cadastrados" },
  }),
});
