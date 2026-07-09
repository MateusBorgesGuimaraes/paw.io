import type React from "react";
import clsx from "clsx";
import styles from "./Box.module.css";

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

export const Box = ({ children, className }: BoxProps) => {
  return <div className={clsx(styles.boxStyles, className)}>{children}</div>;
};
