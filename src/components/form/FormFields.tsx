import React, { memo } from "react";
import { FormFieldProps } from "@/components/form/types";
import { TextField } from "@/components/form/fields/TextField";
import { FormLabel } from "@/components/form/FormLabel";

const FormField: React.FC<FormFieldProps> = ({ field, path, value, errors, updateModelValue }) => {
  const generateField = () => {
    let Component = null;

    switch (field.type) {
      case "text":
      case "password":
        Component = TextField;
        break;
      default:
        return <></>;
    }

    return (
      <FormLabel label={field.label} errors={errors} path={path}>
        <Component
          field={field}
          // @ts-ignore
          value={value}
          path={path}
          updateModelValue={updateModelValue}
        />
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
