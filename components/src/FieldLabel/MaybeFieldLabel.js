import React from "react";
import { FieldLabel } from "ComponentsRoot";

const MaybeFieldLabel = ({
  labelText,
  children,
  ...props,
}) => (
  labelText ?
  <FieldLabel labelText={ labelText } { ...props } >
    {children}
  </FieldLabel>  
  :
  <>
    {children}
  </>
);

export default MaybeFieldLabel;