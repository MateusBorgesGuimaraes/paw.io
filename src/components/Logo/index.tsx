import clsx from "clsx";
import styles from "./Logo.module.css";
import { Link } from "@tanstack/react-router";

type LogoProps = {
  color?: "white" | "black";
};

export const Logo = ({ color = "black" }: LogoProps) => {
  return (
    <Link to="/" className={clsx(styles.logo, styles[color])}>
      Paw.io
    </Link>
  );
};
