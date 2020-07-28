import React, { useContext } from "react";
import WindowedSelect from "react-windowed-select";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "./customReactSelectStyles";
import { SelectPropTypes, SelectDefaultProps } from "./Select.type";
import { SelectOption } from "./SelectOption";
import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectMenu,
  SelectInput
} from "./SelectComponents";

export const getOption = (options, value) => {
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
  windowThreshold,
  filterOption
}) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  return (
    <Field>
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
        <WindowedSelect
          className={className}
          classNamePrefix={classNamePrefix}
          noOptionsMessage={noOptionsMessage}
          placeholder={placeholder || t("select ...")}
          options={options}
          labelText={labelText}
          windowThreshold={windowThreshold}
          styles={customStyles({ theme: themeContext, error, maxHeight, windowed: options.length > windowThreshold })}
          isDisabled={disabled}
          isSearchable={autocomplete}
          aria-required={required}
          aria-invalid={error}
          defaultMenuIsOpen={initialIsOpen}
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
          filterOption={filterOption}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </MaybeFieldLabel>
    </Field>
  );
};

ReactSelect.propTypes = {
  ...SelectPropTypes,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  windowThreshold: PropTypes.number,
  filterOption: PropTypes.func
};

ReactSelect.defaultProps = {
  ...SelectDefaultProps,
  windowThreshold: 300,
  filterOption: undefined
};

export default ReactSelect;
