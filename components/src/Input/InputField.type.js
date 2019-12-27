import PropTypes from "prop-types";

export const InputFieldPropTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
  labelText: PropTypes.string,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  suffixWidth: PropTypes.string,
  prefixWidth: PropTypes.string,
  suffixAlignment: PropTypes.string,
  prefixAlignment: PropTypes.string
};

export const InputFieldDefaultProps = {
  disabled: false,
  required: false,
  error: false,
  labelText: null,
  helpText: null,
  requirementText: null,
  suffix: null,
  suffixWidth: null,
  suffixAlignment: "left",
  prefix: null,
  prefixWidth: null,
  prefixAlignment: "left",
  icon: undefined
};
