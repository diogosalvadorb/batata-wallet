import { Input } from "@/components/ui/input";
import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";


export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<React.ComponentProps<typeof Input>>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";