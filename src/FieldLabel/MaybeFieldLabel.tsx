import React from "react";
import FieldLabel from "./FieldLabel";

const MaybeFieldLabel = ({ labelText, children, ...props }: any) =>
  labelText ? (
    <FieldLabel labelText={labelText} {...props}>
      {children}
    </FieldLabel>
  ) : (
    <>{children}</>
  );

export default MaybeFieldLabel;
