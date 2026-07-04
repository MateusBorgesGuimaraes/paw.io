import clsx from "clsx";
import styles from "./Logo.module.css";

type LogoProps = {
  color?: "white" | "black";
};

export const Logo = ({ color = "black" }: LogoProps) => {
  return <h2 className={clsx(styles.logo, styles[color])}>Paw.io</h2>;
};
