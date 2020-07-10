import React, { useContext } from "react";
import AsyncReactSelect from "react-select/async";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { SelectOption } from "./SelectOption";
import { Control, MultiValue, ClearIndicator, SelectContainer, Menu, Input } from "../Select/SelectComponents";

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
          required={required}
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

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.arrayOf(PropTypes.number)
]);

AsyncSelect.propTypes = {
  autocomplete: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  labelText: PropTypes.string,
  helpText: PropTypes.node,
  noOptionsMessage: PropTypes.func,
  requirementText: PropTypes.string,
  id: PropTypes.string,
  initialIsOpen: PropTypes.bool,
  menuPosition: PropTypes.string,
  maxHeight: PropTypes.string,
  multiselect: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: valueType,
  defaultValue: valueType,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  menuIsOpen: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  onInputChange: PropTypes.func,
  components: PropTypes.shape({}),
  "aria-label": PropTypes.string,
  cacheOptions: PropTypes.bool,
  defaultOptions: PropTypes.arrayOf(PropTypes.shape({})),
  loadOptions: PropTypes.func.isRequired
};

AsyncSelect.defaultProps = {
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
  menuPosition: "absolute",
  multiselect: false,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  placeholder: undefined,
  required: false,
  value: undefined,
  className: null,
  classNamePrefix: undefined,
  menuIsOpen: undefined,
  onMenuOpen: undefined,
  onMenuClose: undefined,
  onInputChange: undefined,
  components: undefined,
  "aria-label": undefined,
  cacheOptions: false,
  defaultOptions: undefined
};

export default AsyncSelect;
