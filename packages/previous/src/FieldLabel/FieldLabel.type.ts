import React from "react";
import type { LabelProps } from "./Label";

export interface FieldLabelProps extends LabelProps {
  hint?: string;
  labelText: string;
  requirementText?: string;
  helpText?: React.ReactNode;
}

export const FieldLabelDefaultProps = {
  children: null,
  requirementText: null,
  helpText: null,
  id: undefined,
};
