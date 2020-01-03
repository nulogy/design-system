import PropTypes from "prop-types";
import { space } from "styled-system";

export const FieldLabelProps = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  requirementText: PropTypes.string,
  helpText: PropTypes.node,
  id: PropTypes.string,
  ...space.PropTypes
};

export const FieldLabelDefaultProps = {
  children: null,
  requirementText: null,
  helpText: null,
  id: undefined
};
