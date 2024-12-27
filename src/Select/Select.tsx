import React, { forwardRef, ReactNode, MutableRefObject } from "react";
import Select from "react-select/base";
import ReactSelect, { PropsValue } from "react-select";
import type { GroupBase, Props, StylesConfig } from "react-select";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { getSubset } from "../utils/subset";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectInput,
  SelectDropdownIndicator,
  SelectMenu,
} from "./SelectComponents";
import { SelectOption } from "./SelectOption";
import MenuList from "./MenuList";
import { calcOptionsLength, checkOptionsAreValid, extractValue, getReactSelectValue } from "./lib";

export type NDSOptionValue = string | number | boolean | null;

export interface NDSOption {
  label: ReactNode;
  value: NDSOptionValue;
}

interface CustomProps<IsMulti extends boolean, Group extends GroupBase<NDSOption>> extends StyledProps {
  autocomplete?: Props<NDSOption, IsMulti, Group>["isSearchable"];
  labelText?: string;
  size?: ComponentVariant;
  requirementText?: string;
  helpText?: ReactNode;
  disabled?: Props<NDSOption, IsMulti, Group>["isDisabled"];
  errorMessage?: string;
  errorList?: string[];
  initialIsOpen?: Props<NDSOption, IsMulti, Group>["defaultMenuIsOpen"];
  multiselect?: Props<NDSOption, IsMulti, Group>["isMulti"];
  maxHeight?: string;
  defaultValue?: PropsValue<NDSOptionValue>;
  value?: PropsValue<NDSOptionValue>;
  options: NDSOption[];
  onChange?: (newValue: PropsValue<NDSOptionValue>) => void;
  windowThreshold?: number;
  styles?: (selectStyles: StylesConfig<NDSOption, IsMulti, Group>) => StylesConfig<NDSOption, IsMulti, Group>;
}

export type NDSSelectProps<
  IsMulti extends boolean = boolean,
  Group extends GroupBase<NDSOption> = GroupBase<NDSOption>
> = Omit<
  Props<NDSOption, IsMulti, Group>,
  keyof CustomProps<IsMulti, Group> | "isSearchable" | "isDisabled" | "defaultMenuIsOpen" | "isMulti" | "styles"
> &
  CustomProps<IsMulti, Group>;

const NDSSelect = forwardRef(
  <IsMulti extends boolean = boolean, Group extends GroupBase<NDSOption> = GroupBase<NDSOption>>(
    {
      autocomplete,
      value,
      onChange,
      defaultValue,
      labelText,
      required,
      requirementText,
      helpText,
      disabled,
      errorMessage,
      errorList,
      id,
      initialIsOpen,
      maxHeight,
      multiselect,
      placeholder,
      components,
      size,
      windowThreshold,
      options,
      styles,
      ...props
    }: NDSSelectProps<IsMulti, Group>,
    ref:
      | ((instance: Select<NDSOption, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<NDSOption, IsMulti, Group> | null>
      | null
  ) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const styledProps = getSubset(props, addStyledProps);
    const error = !!(errorMessage || errorList);
    const optionsRef = React.useRef(options);
    const componentVariant = useComponentVariant(size);
    const optionsLength = React.useMemo(() => calcOptionsLength(options), [options]);
    const isWindowed = optionsLength >= windowThreshold;

    React.useEffect(() => {
      checkOptionsAreValid(options);
      optionsRef.current = options;
    }, [options]);

    const stylesConfig = customStyles<NDSOption, IsMulti, Group>({
      theme: theme,
      error,
      maxHeight,
      variant: componentVariant,
      windowed: options.length > windowThreshold,
    });

    return (
      <Field {...styledProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <ReactSelect
            ref={ref}
            isSearchable={autocomplete}
            isDisabled={disabled}
            defaultMenuIsOpen={initialIsOpen}
            isMulti={multiselect}
            defaultValue={getReactSelectValue(options, defaultValue)}
            value={getReactSelectValue(options, value)}
            options={options}
            onChange={(newValue) => {
              if (!onChange) return;

              const value = extractValue(newValue, multiselect);
              onChange(value);
            }}
            placeholder={placeholder || t("select")}
            aria-required={required}
            required={required}
            aria-invalid={error}
            inputId={id}
            styles={styles ? styles(stylesConfig) : stylesConfig}
            components={{
              Option: (props) => (
                <SelectOption variant={componentVariant} {...props}>
                  {props.children}
                </SelectOption>
              ),
              Control: SelectControl,
              MultiValue: SelectMultiValue,
              ClearIndicator: SelectClearIndicator,
              DropdownIndicator: SelectDropdownIndicator,
              SelectContainer: SelectContainer,
              Menu: SelectMenu,
              Input: SelectInput,
              ...(isWindowed ? { MenuList } : {}),
              ...components,
            }}
            {...props}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
);

export default NDSSelect;
