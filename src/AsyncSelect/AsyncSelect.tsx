import React, { forwardRef, ReactNode, MutableRefObject } from "react";
import { IconName } from "@nulogy/icons";
import Select from "react-select/base";
import AsyncReactSelect from "react-select/async";
import { AsyncProps } from "react-select/async";
import { GroupBase } from "react-select";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { getSubset } from "../utils/subset";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectInput,
  SelectDropdownIndicator,
  SelectMenu,
  SelectOption,
} from "./AsyncSelectComponents";

type AsyncCustomProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
  autocomplete?: AsyncProps<Option, IsMulti, Group>["isSearchable"];
  labelText?: string;
  variant?: ComponentVariant;
  requirementText?: string;
  helpText?: ReactNode;
  disabled?: AsyncProps<Option, IsMulti, Group>["isDisabled"];
  errorMessage?: string;
  errorList?: string[];
  initialIsOpen?: AsyncProps<Option, IsMulti, Group>["defaultMenuIsOpen"];
  multiselect?: AsyncProps<Option, IsMulti, Group>["isMulti"];
  maxHeight?: string;
  defaultValue?: AsyncProps<Option, IsMulti, Group>["defaultInputValue"];
  iconLeft?: IconName | "loading";
};

export type AsyncSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = Omit<
  AsyncProps<Option, IsMulti, Group>,
  "isSearchable" | "isDisabled" | "isMulti" | "defaultMenuIsOpen" | "defaultInputValue"
> &
  AsyncCustomProps<Option, IsMulti, Group>;

const AsyncSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    {
      autocomplete,
      labelText,
      required,
      requirementText,
      helpText,
      noOptionsMessage,
      disabled,
      errorMessage,
      errorList,
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
      cacheOptions = false,
      defaultOptions,
      loadOptions,
      isClearable,
      ...props
    }: AsyncSelectProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const { t } = useTranslation();
    const variant = useComponentVariant();
    const theme = useTheme();
    const spaceProps = getSubset(props, propTypes.space);
    const error = !!(errorMessage || errorList);
    const componentVariant = useComponentVariant(variant);
    noOptionsMessage ||= () => t("no options");

    return (
      <Field {...spaceProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <AsyncReactSelect
            className={className}
            classNamePrefix={classNamePrefix}
            noOptionsMessage={noOptionsMessage || t("no options")}
            value={value}
            ref={ref}
            defaultInputValue={defaultValue}
            placeholder={placeholder || t("start typing")}
            styles={customStyles<Option, IsMulti, Group>({
              hasIcon: Boolean(props.iconLeft),
              theme,
              error,
              variant,
              maxHeight,
              windowed: false,
              hasDefaultOptions: Boolean(defaultOptions),
            })}
            isDisabled={disabled}
            isSearchable={autocomplete}
            aria-required={required}
            required={required}
            aria-invalid={error}
            defaultMenuIsOpen={initialIsOpen}
            inputId={id}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
            isMulti={multiselect}
            menuIsOpen={menuIsOpen}
            onMenuOpen={onMenuOpen}
            onMenuClose={onMenuClose}
            menuPosition={menuPosition}
            onInputChange={onInputChange}
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
              ...components,
            }}
            aria-label={ariaLabel}
            cacheOptions={cacheOptions}
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            isClearable={isClearable}
            {...props}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
);

export default AsyncSelect;
