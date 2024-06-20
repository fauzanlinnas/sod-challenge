"use client";
import React from "react";
import { FormGeneratorProps } from "@/components/form/types";
import { FormGeneratorLoader } from "@/components/form/FormGeneratorLoader";
import { FormField } from "@/components/form/FormFields";

const FormGenerator = React.forwardRef<HTMLFormElement, FormGeneratorProps>(
  ({ schema, state: formGenState, model, updateModelValue }, ref) => {
    if (formGenState.isLoading) {
      return <FormGeneratorLoader />;
    }

    // TODO: Challenge #5 last_name re-rendered as I change value for first_name. Figure how to optimize this.
    return (
      <>
        {schema.definitions.map((field, i) => (
          <FormField
            key={field.name + i}
            field={field}
            path={field.name} // if you are wondering why
            value={model?.[field.name]}
            errors={formGenState?.errors?.[field.name]}
            updateModelValue={updateModelValue}
          />
        ))}
      </>
    );
  }
);

FormGenerator.displayName = "FormGenerator";

export { FormGenerator };
