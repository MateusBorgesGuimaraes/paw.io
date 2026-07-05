import { createRouter } from "@tanstack/react-router";
import { queryClient } from "./query-client";
import { routeTree } from "../routeTree.gen";

const context = {
  queryClient,
  page: undefined as { title: string; subtitle?: string } | undefined,
};

export type RouterContext = typeof context;

export const router = createRouter({
  routeTree,
  context,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
