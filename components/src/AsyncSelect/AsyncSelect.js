import React, { useContext } from "react";
import AsyncReactSelect from "react-select/async";
import { components as selectComponents } from "react-select";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "./customReactSelectStyles";
import { SelectPropTypes, SelectDefaultProps } from "./Select.type";
import SelectOption from "./SelectOption";

const Control = props => {
  // eslint-disable-next-line react/prop-types
  const { isFocused } = props;
  return (
    <div data-testid="select-control">
      <selectComponents.Control className={isFocused ? "nds-select--is-focused" : null} {...props} />
    </div>
  );
};

const MultiValue = props => {
  return (
    <div data-testid="select-multivalue">
      <selectComponents.MultiValue {...props} />
    </div>
  );
};

const ClearIndicator = props => {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props} />
    </div>
  );
};

const Menu = props => {
  return (
    <div data-testid="select-dropdown">
      <selectComponents.Menu {...props} />
    </div>
  );
};

const SelectContainer = props => {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props} />
    </div>
  );
};

const Input = props => {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props} />
    </div>
  );
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

const AsyncSelect = ({
  autocomplete,
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
  menuPosition,
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
  components,
  "aria-label": ariaLabel,
  cacheOptions,
  defaultOptions,
  loadOptions
}) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  return (
    <Field>
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
        <AsyncReactSelect
          className={className}
          classNamePrefix={classNamePrefix}
          noOptionsMessage={noOptionsMessage}
          inputValue={value}
          defaultInputValue={defaultValue}
          placeholder={placeholder || t("select ...")}
          labelText={labelText}
          styles={customStyles({ theme: themeContext, error, maxHeight, windowed: false })}
          isDisabled={disabled}
          isSearchable={autocomplete}
          aria-required={required}
          aria-invalid={error}
          defaultMenuIsOpen={initialIsOpen}
          inputId={id}
          onBlur={onBlur}
          onChange={onChange && (option => onChange(extractValue(option, multiselect)))}
          name={name}
          isMulti={multiselect}
          menuIsOpen={menuIsOpen}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          menuPosition={menuPosition}
          onInputChange={onInputChange}
          theme={themeContext}
          components={{
            Option: SelectOption,
            Control,
            MultiValue,
            ClearIndicator,
            SelectContainer,
            Menu,
            Input,
            ...components
          }}
          aria-label={ariaLabel}
          cacheOptions={cacheOptions}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </MaybeFieldLabel>
    </Field>
  );
};

AsyncSelect.propTypes = SelectPropTypes;

AsyncSelect.defaultProps = SelectDefaultProps;

export default AsyncSelect;
