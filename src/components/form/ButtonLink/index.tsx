import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import styles from "./ButtonLink.module.css";

type ButtonLinkVariant = "default" | "success" | "warning" | "danger";

type ButtonLinkCommonProps = {
  children: React.ReactNode;
  variant?: ButtonLinkVariant;
  disabled?: boolean;
  className?: string;
};

type ButtonLinkAsLink = ButtonLinkCommonProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonLinkAsButton = ButtonLinkCommonProps & {
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
};

type ButtonLinkProps = ButtonLinkAsLink | ButtonLinkAsButton;

export function ButtonLink(props: ButtonLinkProps) {
  const { children, variant = "default", disabled, className } = props;

  const classNames = clsx(styles.button, styles[variant], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <Link to={props.href} className={classNames} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonLinkAsButton;

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
