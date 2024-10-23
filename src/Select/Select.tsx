import React, { ReactNode } from "react";
import propTypes from "@styled-system/prop-types";
import WindowedSelect, { GroupBase } from "react-windowed-select";
import type { MenuPlacement, MenuPosition, Props as SelectProps } from "react-select";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { getSubset } from "../utils/subset";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
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

// NOTE: We recreate these props as upstream doesn't export them. Note also that
// we have a default value for windowThreshold, therefore this param is optional.
interface WindowedSelectProps extends SelectProps {
  windowThreshold?: number;
}

interface NDSOptionType {
  label: string;
  value: unknown;
}

interface CustomProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
  autocomplete?: SelectProps<Option, IsMulti, Group>["isSearchable"];
  labelText?: string;
  requirementText?: string;
  helpText?: ReactNode;
  disabled?: SelectProps<Option, IsMulti, Group>["isDisabled"];
  errorMessage?: string;
  errorList?: string[];
  initialIsOpen?: SelectProps<Option, IsMulti, Group>["defaultMenuIsOpen"];
  multiselect?: SelectProps<Option, IsMulti, Group>["isMulti"];
  maxHeight?: string;
  variant?: ComponentVariant;
  error?: boolean;
  options: NDSOptionType[];
  onChange?: (newValue: unknown) => void;
  [key: string]: any;
}

export type NDSSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = Omit<
  WindowedSelectProps,
  "isSearchable" | "isDisabled" | "isMulti" | "defaultMenuIsOpen" | "defaultInputValue" | "options" | "onChange"
> &
  CustomProps<Option, IsMulti, Group>;

const ReactSelect = React.forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    {
      variant,
      options,
      labelText,
      requirementText,
      helpText,
      disabled,
      errorMessage,
      errorList,
      error = !!(errorMessage || errorList),
      id,
      initialIsOpen,
      onChange,
      placeholder,
      value,
      defaultValue,
      components,
      "aria-label": ariaLabel,
      windowThreshold = 300,
      autocomplete = true,
      maxHeight = "248px",
      required = false,
      menuPosition = "absolute" as MenuPosition,
      menuPlacement = "bottom" as MenuPlacement,
      multiselect,
      classNamePrefix = "ndsSelect",
      closeMenuOnSelect = true,
      ...props
    }: NDSSelectProps<Option, IsMulti, Group>,
    ref
  ) => {
    const { t } = useTranslation();
    const themeContext = React.useContext(ThemeContext);
    const spaceProps = getSubset(props, propTypes.space);
    const reactSelectRef = React.useRef<ReactSelectStateManager>(null);
    const optionsRef = React.useRef(options);

    const componentVariant = useComponentVariant(variant);

    React.useEffect(() => {
      checkOptionsAreValid(options);
      optionsRef.current = options;
    }, [options]);

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
            ref={reactSelectRef}
            placeholder={placeholder || t("select")}
            windowThreshold={windowThreshold}
            styles={customStyles({
              theme: themeContext,
              error,
              maxHeight,
              size: componentVariant,
              windowed: options.length > windowThreshold,
            })}
            isDisabled={disabled}
            isSearchable={autocomplete}
            aria-required={required}
            aria-invalid={error}
            defaultMenuIsOpen={initialIsOpen}
            inputId={id}
            onChange={(option) => {
              if (!onChange) return;

              const value = extractValue(option as NDSOptionType | NDSOptionType[], multiselect);
              onChange(value);
            }}
            defaultValue={getReactSelectValue(options, defaultValue)}
            value={getReactSelectValue(options, value)}
            isMulti={multiselect}
            components={{
              Option: (props) => <SelectOption variant={componentVariant} {...props} />,
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
            menuPosition={menuPosition}
            menuPlacement={menuPlacement}
            classNamePrefix={classNamePrefix}
            closeMenuOnSelect={closeMenuOnSelect}
            {...props}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
);

const checkOptionsAreValid = (options: NDSOptionType[]) => {
  if (options && process.env.NODE_ENV === "development") {
    const uniq = (a: unknown[]) => Array.from(new Set(a));

    const uniqueValues = uniq(options.map(({ value }) => (value === null ? "_null_" : value)));

    if (uniqueValues.length < options.length) {
      console.warn("NDS: The options prop passed to Select must have unique values for each option", options);
    }
  }
};

export const getOption = (options: NDSOptionType[], value: unknown) => {
  // allows an option with  a null value to be matched
  if (options.length > 0 && value !== undefined) {
    const optionWithMatchingValue = options.find((o) => o.value === value);
    return optionWithMatchingValue || null;
  }
  return value;
};

const getReactSelectValue = (options: NDSOptionType[], input: unknown) => {
  if (Array.isArray(input)) {
    return input.map((i) => getOption(options, i));
  }
  return getOption(options, input);
};

function extractValue(options: NDSOptionType[] | NDSOptionType, isMulti: boolean) {
  if (Array.isArray(options)) {
    if (isMulti) {
      return options && options.length ? options.map((o) => o.value) : [];
    } else {
      throw new Error("UNEXPECTED ERROR: don't forget to enable isMulti");
    }
  }

  if (options === null) {
    return options;
  } else {
    return options.value;
  }
}

export default ReactSelect;
