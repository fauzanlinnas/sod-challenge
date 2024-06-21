// TODO: Challenge #3 - create a password field component
import EyeInvisible from "@/assets/icons/EyeInvisible";
import EyeVisible from "@/assets/icons/EyeVisible";
import { PasswordFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ field, value, path, updateModelValue, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
      console.log(`PasswordField ${path} mounted`);
      return () => {
        console.log(`PasswordField ${path} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`PasswordField ${path} rerendered`);
    });

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          name={field.name}
          id={path}
          // @ts-ignore
          value={value}
          onChange={(e) => updateModelValue(path, field, e.target.value)}
          type={isPasswordVisible ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {isPasswordVisible ? <EyeInvisible /> : <EyeVisible />}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";
export { PasswordField };
