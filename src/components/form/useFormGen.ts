import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import {
  FieldDefinition,
  FormErrors,
  FormModel,
  FormSchema,
  ModelPath,
  SubmitHandler,
  UseFormGeneratorProps,
  UseFormGeneratorReturn,
  UseFormGenHandleSubmit,
} from "@/components/form/types";
import cloneObject from "@/utils/cloneObject";
import set from "@/utils/set";
import deepEqual from "@/utils/deepEqual";
import { PrimitiveValues } from "@/utils/types";

const getYupSchema = (schema: FormSchema) => {
  const shape = schema.definitions.reduce((acc, field) => {
    let validator = yup.string();

    if (field.rules) {
      field.rules.forEach((rule) => {
        if (rule.name === "required") {
          validator = validator.required("This field is required");
        }
      });
    }
    acc[field.name] = validator;
    return acc;
  }, {} as Record<string, yup.StringSchema>);
  return yup.object().shape(shape);
};

// TODO: Challenge #1 - There's bug hidden in this file.
export function useFormGen(props: UseFormGeneratorProps): UseFormGeneratorReturn {
  const [state, setState] = useState({
    isDirty: false,
    isLoading: true,
    isSubmitting: false,
    isSubmitted: false,
    errors: {} as FormErrors,
    defaultValue: props.model as FormModel,
  });

  const [model, setModel] = useState({} as FormModel);
  const validationSchema = getYupSchema(props.schema);

  useEffect(() => {
    // init values from
    setTimeout(() => {
      setModel(props.model);
      setState((prev) => {
        return {
          ...prev,
          isLoading: false,
        };
      });
    }, 500); // timeout set here just to illustrate a loader for form gen.
  }, []);

  useEffect(() => {
    const isDirty = !deepEqual(model, state.defaultValue);
    if (isDirty != state.isDirty) {
      setState((prev) => {
        return {
          ...prev,
          isDirty: isDirty,
        };
      });
    }
  }, [model, state.defaultValue, state.isDirty]);

  const updateModelValue = useCallback(
    (path: ModelPath, definition: FieldDefinition, value: PrimitiveValues) => {
      setModel((prev) => {
        const newModel = cloneObject(prev);
        set(newModel, path, value);
        return newModel;
      });
    },
    [model, state]
  );

  const validateModel = async (modelForSubmit: FormModel): Promise<FormErrors> => {
    const validationSchema = getYupSchema(props.schema);

    try {
      await validationSchema.validate(modelForSubmit, { abortEarly: false });
      return {};
    } catch (yupError) {
      const errors: FormErrors = {};
      (yupError as yup.ValidationError).inner.forEach((error: yup.ValidationError) => {
        if (error.path) {
          errors[error.path] = [{ type: error.type as string, value: error.message }];
        }
      });
      return errors;
    }
  };

  const handleValidFlow = async (onValid: SubmitHandler, modelForSubmit: FormModel) => {
    try {
      await onValid(modelForSubmit);
      setState((prev) => {
        return {
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
        };
      });
    } catch (error) {
      setState((prev) => {
        return {
          ...prev,
          isSubmitting: false,
          isSubmitted: false,
        };
      });
      throw error;
    }
  };

  const handleInvalidFlow = async (onInvalid: SubmitHandler, modelForSubmit: FormModel) => {
    try {
      await onInvalid(modelForSubmit);
    } catch (error) {
      throw error;
    } finally {
      setState((prev) => {
        return {
          ...prev,
          isSubmitting: false,
          isSubmitted: false,
        };
      });
    }
  };

  const handleSubmit: UseFormGenHandleSubmit =
    (onValid, onInvalid) => async (e?: React.BaseSyntheticEvent) => {
      if (e) {
        e.preventDefault && e.preventDefault();
        e.persist && e.persist();
      }
      setState((prev) => {
        return {
          ...prev,
          isSubmitting: true,
        };
      });

      const modelForSubmit = cloneObject(model);
      const validationErrors = await validateModel(modelForSubmit);
      setState((prev) => ({
        ...prev,
        errors: validationErrors,
      }));
      if (Object.keys(validationErrors).length > 0) {
        if (onInvalid) {
          await handleInvalidFlow(onInvalid, modelForSubmit);
        }
        return;
      }
      await handleValidFlow(onValid, modelForSubmit);
    };

  return {
    state,
    model,
    updateModelValue,
    handleSubmit,
  };
}
