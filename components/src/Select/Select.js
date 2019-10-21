import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "./customReactSelectStyles";

const getOption = (options, value) => {
  if (value == null || value === "") return value;

  return options.find(o => o.value === value);
};

const getReactSelectValue = (options, input) => {
  if (Array.isArray(input)) {
    return input.map(i => getOption(options, i));
  }

  return getOption(options, input);
};

const extractValue = (options, isMulti) => {
  if (options === undefined) return options;

  if (isMulti) {
    return options.map(o => o.value);
  } else {
    return options.value;
  }
};

const ReactSelect = ({
  autocomplete,
  options,
  labelText,
  required,
  requirementText,
  helpText,
  noOptionsMessage,
  disabled,
  errorMessage,
  errorList,
  error = !!(errorMessage || errorList),
  id,
  initialIsOpen,
  maxHeight,
  multiselect,
  name,
  onChange,
  placeholder,
  value,
  defaultValue,
  className,
  classNamePrefix
}) => (
  <Field>
    <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
      <Select
        className={className}
        classNamePrefix={classNamePrefix}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        options={options}
        labelText={labelText}
        styles={customStyles(error)}
        isDisabled={disabled}
        isSearchable={autocomplete}
        aria-required={required}
        aria-invalid={error}
        defaultMenuIsOpen={initialIsOpen}
        maxMenuHeight={maxHeight}
        inputId={id}
        onChange={onChange && (option => onChange(extractValue(option, multiselect)))}
        defaultValue={getReactSelectValue(options, defaultValue)}
        value={getReactSelectValue(options, value)}
        name={name}
        isMulti={multiselect}
      />
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </MaybeFieldLabel>
  </Field>
);

ReactSelect.propTypes = {
  autocomplete: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  labelText: PropTypes.string,
  helpText: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  requirementText: PropTypes.string,
  id: PropTypes.string,
  initialIsOpen: PropTypes.bool,
  maxHeight: PropTypes.string,
  multiselect: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  classNamePrefix: PropTypes.string
};

ReactSelect.defaultProps = {
  autocomplete: true,
  disabled: null,
  defaultValue: undefined,
  error: undefined,
  errorMessage: null,
  errorList: null,
  labelText: null,
  helpText: null,
  noOptionsMessage: () => null,
  requirementText: null,
  id: null,
  initialIsOpen: undefined,
  maxHeight: "248px",
  multiselect: false,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  required: false,
  value: undefined,
  className: null,
  classNamePrefix: undefined
};

export default ReactSelect;
