import type { ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Link } from "@tanstack/react-router";
import { useSidebar } from "./useSidebar";
import styles from "./Sidebar.module.css";

type SidebarItemProps = {
  to: string;
  icon: ReactNode;
  label: string;
};

export function SidebarItem({ to, icon, label }: SidebarItemProps) {
  const { expanded } = useSidebar();

  const link = (
    <Link
      to={to}
      className={styles.item}
      activeProps={{ className: styles.itemActive }}
    >
      <span className={styles.itemIcon}>{icon}</span>
      {expanded && <span className={styles.itemLabel}>{label}</span>}
    </Link>
  );

  if (expanded) {
    return link;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.tooltip}
            side="right"
            sideOffset={8}
          >
            {label}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
