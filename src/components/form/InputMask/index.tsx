import { forwardRef } from "react";
import { PatternFormat, type PatternFormatProps } from "react-number-format";
import { Input } from "../Input";

type InputMaskProps = Omit<PatternFormatProps, "customInput"> & {
  label?: string;
  error?: string;
  description?: string;
  requerid?: boolean;
};

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ format, mask, ...props }, ref) => {
    return (
      <PatternFormat
        getInputRef={ref}
        customInput={Input}
        format={format}
        mask={mask}
        {...props}
      />
    );
  },
);

InputMask.displayName = "InputMask";
