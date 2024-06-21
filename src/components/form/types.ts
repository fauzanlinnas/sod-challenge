import React from "react";
import { PrimitiveValues } from "@/utils/types";

export type FormSchema = {
  name: string;
  definitions: FieldDefinition[];
};

export type FieldDefinition = {
  name: string;
  type: FieldType;
  label: FieldLabel;
  rules?: ValidationRule[];
};

export type FieldLabel = {
  text: string;
  tooltip?: string;
  tooltipIcon?: string;
  tooltipTemplate?: string;
  prefix?: string;
  suffix?: string;
};

export type ValidationRule = {
  name: ValidationRuleType;
  options?: any[];
};

export type FormGeneratorProps = {
  schema: FormSchema;
  state: UseFormGeneratorState;
  model: FormModel;
  updateModelValue: UpdateModelValue;
};

export type FormGeneratorProviderProps = {
  updateModelValue: UpdateModelValue;
  children: React.ReactNode;
};

export type FormGeneratorContextType = {
  updateModelValue: UpdateModelValue;
};

export type FormFieldProps = {
  field: FieldDefinition;
  path: ModelPath;
  value: FormModel | FormModel[] | PrimitiveValues | PrimitiveValues[];
  errors: ValidationError[];
  updateModelValue: UpdateModelValue;
};

export type FormLabelProps = {
  label: FieldLabel;
  errors: ValidationError[];
  path: ModelPath;
  children: React.ReactNode;
};

export type BaseFieldProps = {
  field: FieldDefinition;
  value: PrimitiveValues;
  path: ModelPath;
  updateModelValue: UpdateModelValue;
};

export interface TextFieldProps extends BaseFieldProps {}
export interface PasswordFieldProps extends BaseFieldProps {}

export type UseFormGeneratorState = {
  isDirty: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: FormErrors;
  defaultValue: FormModel;
};
export type UseFormGeneratorProps = {
  schema: FormSchema;
  model: FormModel;
};
export type UseFormGeneratorReturn = {
  state: UseFormGeneratorState;
  model: FormModel;
  updateModelValue: UpdateModelValue;
  handleSubmit: UseFormGenHandleSubmit;
};

export type UpdateModelValue = (
  path: ModelPath,
  definition: FieldDefinition,
  value: PrimitiveValues
) => void;

export type FieldType = "text" | "password" | "combo" | "radio" | "checkbox";
export type ValidationRuleType = "required";

export type ModelPath = string;
export type FormModel = {
  [key: string | ModelPath]: PrimitiveValues | PrimitiveValues[] | FormModel | FormModel[];
};
export type FormErrors = Record<string, ValidationError[]>;

export type ValidationError = {
  type: string;
  value: PrimitiveValues;
  threshold?: DateValidationThreshold | NumberValidationThresholdType;
};

export type DateValidationThreshold = {
  max?: string; // string for date
  min?: string; // string for date
  type: DateValidationThresholdType;
};
export type NumberValidationThreshold = {
  max?: string; // string for date
  min?: string; // string for date
  type: NumberValidationThresholdType;
};

// export type RelatedFieldValidationThreshold = {
//     field: string;
//     fieldLabel: string;
// }
export type NumberValidationThresholdType = "gte" | "gt" | "lte" | "lt" | "between";
export type DateValidationThresholdType = "gte" | "gt" | "lte" | "lt" | "between";

export type SubmitHandler = (
  data: FormModel,
  event?: React.BaseSyntheticEvent
) => unknown | Promise<unknown>;
export type UseFormGenHandleSubmit = (
  onValid: SubmitHandler,
  onInvalid?: SubmitHandler
) => (e?: React.BaseSyntheticEvent) => Promise<void>;
