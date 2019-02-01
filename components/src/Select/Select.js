import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

const Select = props => (
  <ReactSelect { ...props } />
);

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default Select;
