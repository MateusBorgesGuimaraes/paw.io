import clsx from "clsx";
import styles from "./Badge.module.css";

type BadgeVariant =
  "neutral" | "primary" | "success" | "warning" | "danger" | "info";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
};

export function Badge({
  children,
  variant = "neutral",
  icon,
  className,
}: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {icon}
      {children}
    </span>
  );
}
