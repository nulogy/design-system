import React, { useContext, useEffect, forwardRef } from "react";
import propTypes from "@styled-system/prop-types";
import WindowedSelect from "react-windowed-select";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { getSubset } from "../utils/subset";
import customStyles from "./customReactSelectStyles";
import { SelectOption } from "./SelectOption";

import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectMenu,
  SelectInput,
  SelectDropdownIndicator,
} from "./SelectComponents";

export type SelectProps = {
  options?: any[];
  windowThreshold?: number;
  filterOption?: (...args: any[]) => any;
  autocomplete?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  errorList?: string[];
  labelText?: string;
  helpText?: any;
  noOptionsMessage?: Function;
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
  value?: any;
  defaultValue?: any;
  className?: string;
  classNamePrefix?: string;
  menuIsOpen?: boolean;
  onMenuOpen?: (...args: any[]) => any;
  onMenuClose?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  components?: any;
  closeMenuOnSelect?: boolean;
  "aria-label"?: string;
  [key: string]: any; // Allow for custom props to be passed and used inside custom components using the `selectProps` prop
};

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
  classNamePrefix: "ndsSelect", // a prefix is required in react-select top put classes on all buttons to apply style overrides
  menuIsOpen: undefined,
  onMenuOpen: undefined,
  onMenuClose: undefined,
  onInputChange: undefined,
  components: undefined,
  closeMenuOnSelect: true,
};

const checkOptionsAreValid = (options) => {
  if (options && process.env.NODE_ENV === "development") {
    const uniq = (a) => Array.from(new Set(a));
    const uniqueValues = uniq(options.map(({ value }) => (value === null ? "_null_" : value)));
    if (uniqueValues.length < options.length) {
      console.warn("NDS: The options prop passed to Select must have unique values for each option", options);
    }
  }
};

export const getOption = (options, value) => {
  // allows an option with  a null value to be matched
  if (options.length > 0 && value !== undefined) {
    const optionWithMatchingValue = options.find((o) => o.value === value);
    return optionWithMatchingValue || null;
  }
  return value;
};

const getReactSelectValue = (options, input) => {
  if (Array.isArray(input)) {
    return input.map((i) => getOption(options, i));
  }
  return getOption(options, input);
};
const extractValue = (options, isMulti) => {
  if (isMulti) {
    return options && options.length ? options.map((o) => o.value) : [];
  }

  if (options == null) {
    return options;
  } else {
    return options.value;
  }
};

const ReactSelect = forwardRef(
  (
    {
      autocomplete,
      options,
      labelText,
      required,
      requirementText,
      helpText,
      disabled,
      errorMessage,
      errorList,
      error = !!(errorMessage || errorList),
      id,
      initialIsOpen,
      maxHeight,
      multiselect,
      onChange,
      placeholder,
      value,
      defaultValue,
      components,
      "aria-label": ariaLabel,
      windowThreshold = 300,
      ...props
    }: SelectProps,
    ref
  ) => {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const spaceProps = getSubset(props, propTypes.space);

    useEffect(() => {
      checkOptionsAreValid(options);
    }, [options]);

    const handleChange = (option) => {
      // onChange && ((option) => onChange(extractValue(option, multiselect)))
      onChange && onChange(extractValue(option, multiselect))
      // console.log('handleChange', option)
    }
    
    const handleInputChange = (e) => {
      props.onInputChange && props.onInputChange(e);
      // console.log('handleInputChange', e)

    }

    const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData =  e.clipboardData.getData('text/plain');
      const options = clipboardData.split(', ');
      console.log('handlePaste', { options, clipboardData: e.clipboardData.getData('text/plain')})
    }

    return (
      <Field {...spaceProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <WindowedSelect
            ref={ref}
            placeholder={placeholder || (t("select ...") as string)}
            windowThreshold={windowThreshold}
            /* @ts-ignore */
            styles={customStyles({
              theme: themeContext,
              error,
              maxHeight,
              windowed: options.length > windowThreshold,
            })}
            isDisabled={disabled}
            isSearchable={autocomplete}
            aria-required={required}
            aria-invalid={error}
            defaultMenuIsOpen={initialIsOpen}
            inputId={id}
            onChange={handleChange}
            defaultValue={getReactSelectValue(options, defaultValue)}
            value={getReactSelectValue(options, value)}
            isMulti={multiselect}
            /* @ts-ignore */
            theme={themeContext}
            components={{
              Option: SelectOption,
              Control: SelectControl,
              MultiValue: SelectMultiValue,
              ClearIndicator: SelectClearIndicator,
              DropdownIndicator: SelectDropdownIndicator,
              SelectContainer: SelectContainer,
              Menu: SelectMenu,
              Input: (props) => <SelectInput {...props} onPaste={handlePaste}/>,
              ...components,
            }}
            aria-label={ariaLabel}
            options={options}
            labelText={labelText}
            {...props}
            onInputChange={handleInputChange}
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
  filterOption: undefined,
};
export default ReactSelect;
