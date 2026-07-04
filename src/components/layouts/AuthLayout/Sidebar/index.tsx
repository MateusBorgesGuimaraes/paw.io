import { useState, type ReactNode } from "react";

import styles from "./Sidebar.module.css";
import { SidebarContext } from "./SidebarContext";

type SidebarProps = {
  children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  function toggle() {
    setExpanded((prev) => !prev);
  }

  return (
    <SidebarContext.Provider value={{ expanded, toggle }}>
      <aside
        className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}
