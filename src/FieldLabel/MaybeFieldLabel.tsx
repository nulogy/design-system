import React from "react";
import FieldLabel from "./FieldLabel";

const MaybeFieldLabel: React.SFC<any> = ({ labelText, children, ...props }) =>
  labelText ? (
    <FieldLabel labelText={labelText} {...props}>
      {children}
    </FieldLabel>
  ) : (
    <>{children}</>
  );
MaybeFieldLabel.defaultProps = {
  labelText: null,
  children: null,
};
export default MaybeFieldLabel;
