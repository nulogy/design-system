import React, { useContext } from "react";
import AsyncReactSelect from "react-select/async";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { SelectOption } from "../Select/SelectOption";
import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectMenu,
  SelectInput
} from "../Select/SelectComponents";
import { SelectDefaultProps, SelectPropTypes } from "../Select/Select.type";

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
            Control: SelectControl,
            MultiValue: SelectMultiValue,
            ClearIndicator: SelectClearIndicator,
            SelectContainer: SelectContainer,
            Menu: SelectMenu,
            Input: SelectInput,
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

AsyncSelect.propTypes = {
  ...SelectPropTypes,
  cacheOptions: PropTypes.bool,
  defaultOptions: PropTypes.arrayOf(PropTypes.shape({})),
  loadOptions: PropTypes.func.isRequired
};

AsyncSelect.defaultProps = {
  ...SelectDefaultProps,
  cacheOptions: false,
  defaultOptions: undefined
};

export default AsyncSelect;
