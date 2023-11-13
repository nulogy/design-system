import React from "react";
import propTypes from "@styled-system/prop-types";
import WindowedSelect from "react-windowed-select";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { getSubset } from "../utils/subset";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
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

type ReactSelectStateManager = {
  state: {
    value: any[];
  };
  setState: (prevState: any) => void;
  blur: () => void;
};

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
  menuPlacement?: string;
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
  size?: ComponentSize;
  isClearable?: boolean;
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
  menuPlacement: "bottom",
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

const ReactSelect = React.forwardRef(
  (
    {
      size,
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
    const themeContext = React.useContext(ThemeContext);
    const spaceProps = getSubset(props, propTypes.space);
    const reactSelectRef = React.useRef<ReactSelectStateManager>(null);
    const optionsRef = React.useRef(options);

    const componentSize = useComponentSize(size);

    React.useEffect(() => {
      checkOptionsAreValid(options);
      optionsRef.current = options;
    }, [options]);

    const handleChange = React.useCallback(
      (option) => {
        onChange && onChange(extractValue(option, multiselect));
      },
      [multiselect, onChange]
    );

    React.useEffect(() => {
      if (ref) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = reactSelectRef.current;
      }
    }, [reactSelectRef, ref]);

    return (
      <Field {...spaceProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <WindowedSelect
            size={componentSize}
            ref={reactSelectRef}
            placeholder={placeholder || t("select")}
            windowThreshold={windowThreshold}
            styles={customStyles({
              theme: themeContext,
              error,
              maxHeight,
              size: componentSize,
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
            theme={themeContext}
            components={{
              Option: SelectOption,
              Control: SelectControl,
              MultiValue: SelectMultiValue,
              ClearIndicator: SelectClearIndicator,
              DropdownIndicator: SelectDropdownIndicator,
              SelectContainer: SelectContainer,
              Menu: SelectMenu,
              Input: SelectInput,
              ...components,
            }}
            aria-label={ariaLabel}
            options={options}
            labelText={labelText}
            {...props}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
);

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

ReactSelect.defaultProps = {
  ...SelectDefaultProps,
  windowThreshold: 300,
  filterOption: undefined,
};

export default ReactSelect;
