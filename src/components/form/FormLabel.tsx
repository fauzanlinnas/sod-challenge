import { FormLabelProps } from "@/components/form/types";
import React from "react";
import { Label } from "@/components/ui/label";

const FormLabel = React.forwardRef<HTMLInputElement, FormLabelProps>(
  ({ label, errors, path, children, ...props }, ref) => {
    return (
      <div>
        <Label htmlFor={path}>{label.text}</Label>
        <div>{children}</div>
      </div>
    );
  }
);

FormLabel.displayName = "FormLabel";
export { FormLabel };
