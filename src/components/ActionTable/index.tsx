import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import styles from "./ActionTable.module.css";

type ActionTableVariant = "default" | "danger";

type ActionTableConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

type ActionTableCommonProps = {
  icon: LucideIcon;
  label: string;
  variant?: ActionTableVariant;
  disabled?: boolean;
};

type ActionTableLinkProps = ActionTableCommonProps & {
  href: string;
  onClick?: never;
  confirm?: never;
  toggle?: never;
};

type ActionTableButtonProps = ActionTableCommonProps & {
  href?: never;
  onClick: () => void;
  confirm?: ActionTableConfirmOptions;
  toggle?: never;
};

type ActionTableToggleProps = ActionTableCommonProps & {
  href?: never;
  onClick?: never;
  confirm?: never;
  toggle: {
    checked: boolean;
    onToggle: () => void;
    confirm?:
      | ActionTableConfirmOptions
      | ((checked: boolean) => ActionTableConfirmOptions);
  };
};

type ActionTableProps =
  | ActionTableLinkProps
  | ActionTableButtonProps
  | ActionTableToggleProps;

export function ActionTable(props: ActionTableProps) {
  const { icon: Icon, label, variant = "default", disabled } = props;
  const className = clsx(styles.action, {
    [styles.danger]: variant === "danger",
  });

  if ("href" in props && props.href !== undefined) {
    return (
      <Link
        to={props.href}
        title={label}
        aria-label={label}
        className={className}
        aria-disabled={disabled}
      >
        <Icon size={16} />
      </Link>
    );
  }

  if ("toggle" in props && props.toggle !== undefined) {
    const { checked, onToggle, confirm } = props.toggle;

    function handleToggleClick() {
      if (disabled) return;
      if (!confirm) {
        onToggle();
        return;
      }
      const resolved = typeof confirm === "function" ? confirm(checked) : confirm;
      toast(resolved.title, {
        description: resolved.description,
        action: {
          label: resolved.confirmLabel ?? "Confirmar",
          onClick: () => onToggle(),
        },
        cancel: {
          label: resolved.cancelLabel ?? "Cancelar",
          onClick: () => {},
        },
      });
    }

    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={checked}
        className={className}
        onClick={handleToggleClick}
        disabled={disabled}
      >
        <Icon size={16} />
      </button>
    );
  }

  const { onClick, confirm } = props as ActionTableButtonProps;

  function handleClick() {
    if (disabled) return;
    if (!confirm) {
      onClick();
      return;
    }
    toast(confirm.title, {
      description: confirm.description,
      action: {
        label: confirm.confirmLabel ?? "Confirmar",
        onClick: () => onClick(),
      },
      cancel: {
        label: confirm.cancelLabel ?? "Cancelar",
        onClick: () => {},
      },
    });
  }

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon size={16} />
    </button>
  );
}
