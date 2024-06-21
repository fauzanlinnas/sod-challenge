import { TextFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ field, value, path, updateModelValue, ...props }, ref) => {
    useEffect(() => {
      console.log(`TextField ${path} mounted`);
      return () => {
        console.log(`TextField ${path} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`TextField ${path} rerendered`);
    });

    return (
      <Input
        ref={ref}
        name={field.name}
        id={path}
        // @ts-ignore
        value={value}
        onChange={(e) => updateModelValue(path, field, e.target.value)}
      />
    );
  }
);

TextField.displayName = "TextField";
export { TextField };
