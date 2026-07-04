import { useSidebar } from "./useSidebar";
import styles from "./Sidebar.module.css";
import { Logo } from "../../../Logo";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function SidebarHeader() {
  const { expanded, toggle } = useSidebar();

  return (
    <div className={styles.header}>
      {expanded && (
        <span className={styles.logo}>
          <Logo />
        </span>
      )}
      <button className={styles.toggleButton} onClick={toggle} type="button">
        {expanded ? (
          <>
            <ChevronLeftIcon />
          </>
        ) : (
          <>
            <ChevronRightIcon />
          </>
        )}
      </button>
    </div>
  );
}
