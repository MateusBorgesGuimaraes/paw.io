import { createContext, useContext } from "react";

type SidebarContextValue = {
  expanded: boolean;
  toggle: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar deve ser usado dentro de <Sidebar />");
  }
  return context;
}
