import React, { forwardRef, ReactNode, MutableRefObject } from "react";
import Select from "react-select/base";
import WindowedSelect, { GroupBase } from "react-windowed-select";
import type { Props as SelectProps } from "react-select";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { getSubset } from "../utils/subset";
import { SelectControl } from "../AsyncSelect/AsyncSelectComponents";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import {
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectInput,
  SelectDropdownIndicator,
  SelectMenu,
} from "./SelectComponents";
import { SelectOption } from "./SelectOption";

interface WindowedSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>>
  extends SelectProps<Option, IsMulti, Group> {
  windowThreshold: number;
}

type CustomProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
  autocomplete?: WindowedSelectProps<Option, IsMulti, Group>["isSearchable"];
  labelText?: string;
  size?: ComponentSize;
  requirementText?: string;
  helpText?: ReactNode;
  disabled?: WindowedSelectProps<Option, IsMulti, Group>["isDisabled"];
  errorMessage?: string;
  errorList?: string[];
  initialIsOpen?: WindowedSelectProps<Option, IsMulti, Group>["defaultMenuIsOpen"];
  multiselect?: WindowedSelectProps<Option, IsMulti, Group>["isMulti"];
  maxHeight?: string;
  defaultValue?: WindowedSelectProps<Option, IsMulti, Group>["defaultInputValue"];
};

export type NDSSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = Omit<
  WindowedSelectProps<Option, IsMulti, Group>,
  "isSearchable" | "isDisabled" | "isMulti" | "defaultMenuIsOpen" | "defaultInputValue"
> &
  CustomProps<Option, IsMulti, Group>;

const NDSSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
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
      id,
      initialIsOpen,
      maxHeight,
      isClearable,
      onChange,
      multiselect,
      placeholder,
      value,
      defaultValue,
      noOptionsMessage,
      menuPosition,
      name,
      className,
      classNamePrefix,
      onBlur,
      menuIsOpen,
      onMenuOpen,
      onMenuClose,
      onInputChange,
      components,
      "aria-label": ariaLabel,
      windowThreshold = 100,
      ...props
    }: NDSSelectProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const spaceProps = getSubset(props, propTypes.space);
    const error = !!(errorMessage || errorList);

    const componentSize = useComponentSize(size);

    return (
      <Field {...spaceProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <WindowedSelect
            className={className}
            classNamePrefix={classNamePrefix}
            noOptionsMessage={noOptionsMessage}
            value={value}
            ref={ref}
            defaultInputValue={defaultValue}
            placeholder={placeholder || t("start typing")}
            styles={customStyles({
              theme,
              error,
              maxHeight,
              windowed: options.length > windowThreshold,
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
              SelectOption: (props) => (
                <SelectOption size={componentSize} {...props}>
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
            isClearable={isClearable}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
);

export default NDSSelect;
