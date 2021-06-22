import React from "react";
import {SpaceProps} from "styled-system";

export type FieldLabelProps = SpaceProps & {
  labelText: string,
  children?: React.ReactNode,
  requirementText?: string,
  helpText?: React.ReactNode,
  id: string
}

export const FieldLabelDefaultProps = {
  children: null,
  requirementText: null,
  helpText: null,
  id: undefined,
};
