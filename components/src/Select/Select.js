import React from "react";
import Select, { components as selectComponents } from "react-select";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "./customReactSelectStyles";
import { SelectPropTypes, SelectDefaultProps } from "./Select.type";
import SelectOption from "./SelectOption";

const Control = props => {
  // eslint-disable-next-line react/prop-types
  const { isFocused } = props;
  return <selectComponents.Control className={isFocused ? "nds-select--is-focused" : null} {...props} />;
};

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
  if (options == null) return options;

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
  classNamePrefix,
  onBlur,
  menuIsOpen,
  onMenuOpen,
  onMenuClose,
  onInputChange,
  components
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
        onBlur={onBlur}
        onChange={onChange && (option => onChange(extractValue(option, multiselect)))}
        defaultValue={getReactSelectValue(options, defaultValue)}
        value={getReactSelectValue(options, value)}
        name={name}
        isMulti={multiselect}
        menuIsOpen={menuIsOpen}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onInputChange={onInputChange}
        components={{ Option: SelectOption, Control, ...components }}
      />
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </MaybeFieldLabel>
  </Field>
);

ReactSelect.propTypes = SelectPropTypes;

ReactSelect.defaultProps = SelectDefaultProps;

export default ReactSelect;
