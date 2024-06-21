import React, { memo } from "react";
import { FormFieldProps } from "@/components/form/types";
import { TextField } from "@/components/form/fields/TextField";
import { FormLabel } from "@/components/form/FormLabel";
import { PasswordField } from "@/components/form/fields/PasswordField";

const FormField: React.FC<FormFieldProps> = ({ field, path, value, errors, updateModelValue }) => {
  const generateField = () => {
    let Component = null;

    switch (field.type) {
      case "text":
        Component = TextField;
        break;
      case "password":
        Component = PasswordField;
        break;
      default:
        return <></>;
    }

    const errorMessage = errors && errors.length > 0 ? errors[0].value : null;

    return (
      <FormLabel label={field.label} errors={errors} path={path}>
        <Component
          field={field}
          // @ts-ignore
          value={value}
          path={path}
          updateModelValue={updateModelValue}
        />
        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
      </FormLabel>
    );
  };
  return generateField();
};

FormField.displayName = "FormField";

const MemoizedFormField = memo(FormField, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.errors === nextProps.errors;
});

export { MemoizedFormField as FormField };
