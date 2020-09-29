import React, { useContext, forwardRef } from "react";
import WindowedSelect from "react-windowed-select";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "./customReactSelectStyles";
import { SelectOption } from "./SelectOption";
import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectMenu,
  SelectInput
} from "./SelectComponents";

export const SelectDefaultProps = {
  autocomplete: true,
  disabled: undefined,
  defaultValue: undefined,
  error: undefined,
  errorMessage: undefined,
  errorList: undefined,
  labelText: undefined,
  helpText: undefined,
  noOptionsMessage: undefined,
  requirementText: undefined,
  id: undefined,
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
  className: undefined,
  classNamePrefix: undefined,
  menuIsOpen: undefined,
  onMenuOpen: undefined,
  onMenuClose: undefined,
  onInputChange: undefined,
  components: undefined,
  closeMenuOnSelect: true
};

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
  if (isMulti) {
    return options && options.length ? options.map(o => o.value) : [];
  }

  if (options == null) {
    return options;
  } else {
    return options.value;
  }
};
type ReactSelectProps = {
  options: any[];
  windowThreshold?: number;
  filterOption?: (...args: any[]) => any;
  autocomplete?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  errorList?: string[];
  labelText?: string;
  helpText?: any;
  noOptionsMessage?: string;
  requirementText?: string;
  id?: string;
  initialIsOpen?: boolean;
  menuPosition?: string;
  maxHeight?: string;
  multiselect?: boolean;
  name?: string;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  placeholder?: string;
  required?: boolean;
  value: any;
  defaultValue: any;
  className?: string;
  classNamePrefix?: string;
  menuIsOpen?: boolean;
  onMenuOpen?: (...args: any[]) => any;
  onMenuClose?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  components?: any;
  closeMenuOnSelect?: boolean;
  "aria-label"?: string;
};
const ReactSelect: React.SFC<ReactSelectProps> = forwardRef(
  (
    {
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
      windowThreshold = 300,
      filterOption,
      closeMenuOnSelect
    },
    ref
  ) => {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    return (
      <Field>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <WindowedSelect
            ref={ref}
            className={className}
            classNamePrefix={classNamePrefix}
            noOptionsMessage={noOptionsMessage}
            placeholder={placeholder || t("select ...")}
            options={options}
            labelText={labelText}
            windowThreshold={windowThreshold}
            styles={customStyles({
              theme: themeContext,
              error,
              maxHeight,
              windowed: options.length > windowThreshold
            })}
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
  }
);
ReactSelect.defaultProps = {
  ...SelectDefaultProps,
  windowThreshold: 300,
  filterOption: undefined
};
export default ReactSelect;
