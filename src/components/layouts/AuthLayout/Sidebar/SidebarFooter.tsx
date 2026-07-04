import type { ReactNode } from "react";
import styles from "./Sidebar.module.css";

type SidebarFooterProps = {
  children: ReactNode;
};

export function SidebarFooter({ children }: SidebarFooterProps) {
  return <div className={styles.footer}>{children}</div>;
}
