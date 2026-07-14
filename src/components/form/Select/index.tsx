import { forwardRef, type SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

export interface SelectOption {
  label: string;
  value: string;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  requerid?: boolean;
  description?: string;
  label?: string;
  error?: string;
  options: SelectOption[];
  /** Texto da primeira option, desabilitada, tipo "Selecione..." */
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { requerid, label, error, description, options, placeholder, ...props },
    ref,
  ) => {
    return (
      <div className={styles.selectBox}>
        {label && (
          <label>
            {label} {requerid && <span className={styles.req}>*</span>}{" "}
          </label>
        )}
        <select ref={ref} {...props}>
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {description && !error && <p className={styles.desc}>{description}</p>}
        {error && <p className={styles.err}>{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";
