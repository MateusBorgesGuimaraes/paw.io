import type { ReactNode } from "react";
import styles from "./Sidebar.module.css";

type SidebarContentProps = {
  children: ReactNode;
};

export function SidebarContent({ children }: SidebarContentProps) {
  return <div className={styles.content}>{children}</div>;
}
