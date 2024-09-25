import React from "react";
import FieldLabel from "./FieldLabel";
import type { FieldLabelProps } from "./FieldLabel.type";

interface Props extends Omit<FieldLabelProps, "id"> {
  labelText: string | undefined;
}

const MaybeFieldLabel = ({ labelText, children, ...props }: Props) =>
  labelText ? (
    <FieldLabel labelText={labelText} {...props}>
      {children}
    </FieldLabel>
  ) : (
    <>{children}</>
  );

export default MaybeFieldLabel;
