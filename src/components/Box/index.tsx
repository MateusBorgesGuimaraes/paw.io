import type React from "react";
import styles from "./Box.module.css";

type BoxProps = {
  children: React.ReactNode;
};

export const Box = ({ children }: BoxProps) => {
  return <div className={styles.boxStyles}>{children}</div>;
};
