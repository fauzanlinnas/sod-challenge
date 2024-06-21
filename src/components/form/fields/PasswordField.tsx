// TODO: Challenge #3 - create a password field component
import { PasswordFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ field, value, path, updateModelValue, ...props }, ref) => {
    useEffect(() => {
      console.log(`PasswordField ${path} mounted`);
      return () => {
        console.log(`PasswordField ${path} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`PasswordField ${path} rerendered`);
    });

    return (
      <Input
        ref={ref}
        name={field.name}
        id={path}
        // @ts-ignore
        value={value}
        onChange={(e) => updateModelValue(path, field, e.target.value)}
        type="password"
        {...props}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";
export { PasswordField };
