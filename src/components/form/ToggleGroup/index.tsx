import { forwardRef, type InputHTMLAttributes } from "react";
import type { SelectOption } from "../Select";
import styles from "./ToggleGroup.module.css";

type ToggleGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "size"
> & {
  requerid?: boolean;
  description?: string;
  label?: string;
  error?: string;
  /** Exatamente duas opções — pra 3+ opções use o Select. */
  options: [SelectOption, SelectOption];
};


export const ToggleGroup = forwardRef<HTMLInputElement, ToggleGroupProps>(
  ({ requerid, label, error, description, options, name, ...props }, ref) => {
    const [first, second] = options;

    return (
      <div className={styles.toggleBox}>
        {label && (
          <label>
            {label} {requerid && <span className={styles.req}>*</span>}{" "}
          </label>
        )}

        <div className={styles.group} role="radiogroup" aria-label={label}>
          <label className={styles.option}>
            <input ref={ref} type="radio" name={name} value={first.value} {...props} />
            <span>{first.label}</span>
          </label>

          <label className={styles.option}>
            <input ref={ref} type="radio" name={name} value={second.value} {...props} />
            <span>{second.label}</span>
          </label>
        </div>

        {description && !error && <p className={styles.desc}>{description}</p>}
        {error && <p className={styles.err}>{error}</p>}
      </div>
    );
  },
);
ToggleGroup.displayName = "ToggleGroup";
