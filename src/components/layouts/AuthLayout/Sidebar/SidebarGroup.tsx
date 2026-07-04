import type { ReactNode } from "react";
import { useSidebar } from "./useSidebar";
import styles from "./Sidebar.module.css";

type SidebarGroupProps = {
  label?: string;
  children: ReactNode;
};

export function SidebarGroup({ label, children }: SidebarGroupProps) {
  const { expanded } = useSidebar();

  return (
    <div className={styles.group}>
      {label && expanded && <span className={styles.groupLabel}>{label}</span>}
      <div className={styles.groupItems}>{children}</div>
    </div>
  );
}
