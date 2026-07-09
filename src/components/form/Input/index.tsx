import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  requerid?: boolean;
  description?: string;
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ requerid, label, error, description, ...props }, ref) => {
    return (
      <div className={styles.inputBox}>
        {label && (
          <label>
            {label} {requerid && <span className={styles.req}>*</span>}{" "}
          </label>
        )}
        <input ref={ref} {...props} />
        {description && !error && <p className={styles.desc}>{description}</p>}
        {error && <p className={styles.err}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
