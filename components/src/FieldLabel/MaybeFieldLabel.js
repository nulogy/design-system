import React from "react";
import PropTypes from "prop-types";
import FieldLabel from "./FieldLabel";

const MaybeFieldLabel = ({ labelText, children, ...props }) =>
  labelText ? (
    <FieldLabel labelText={labelText} {...props}>
      {children}
    </FieldLabel>
  ) : (
    <>{children}</>
  );

MaybeFieldLabel.propTypes = {
  labelText: PropTypes.string,
  children: PropTypes.node
};

MaybeFieldLabel.defaultProps = {
  labelText: null,
  children: null
};

export default MaybeFieldLabel;
