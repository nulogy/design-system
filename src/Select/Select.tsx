import React, { forwardRef, ReactNode, MutableRefObject } from "react";
import Select from "react-select/base";
import WindowedSelect from "react-windowed-select";
import type { Props as SelectProps } from "react-select";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { getSubset } from "../utils/subset";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import {
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectInput,
  SelectDropdownIndicator,
  SelectMenu,
  SelectControl,
} from "./SelectComponents";
import { SelectOption } from "./SelectOption";
import { checkOptionsAreValid, getReactSelectValue } from "./lib";

interface WindowedSelectProps extends SelectProps {
  windowThreshold: number;
}

type CustomProps = {
  autocomplete?: WindowedSelectProps["isSearchable"];
  labelText?: string;
  size?: ComponentSize;
  requirementText?: string;
  helpText?: ReactNode;
  disabled?: WindowedSelectProps["isDisabled"];
  errorMessage?: string;
  errorList?: string[];
  initialIsOpen?: WindowedSelectProps["defaultMenuIsOpen"];
  multiselect?: WindowedSelectProps["isMulti"];
  maxHeight?: string;
  defaultValue?: WindowedSelectProps["defaultInputValue"];
  value?: string;
};

export type NDSSelectProps = Omit<
  WindowedSelectProps,
  "isSearchable" | "isDisabled" | "isMulti" | "defaultMenuIsOpen" | "defaultInputValue" | "value"
> &
  CustomProps;

const NDSSelect = forwardRef(
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
    }: NDSSelectProps,
    ref: ((instance: Select | null) => void) | MutableRefObject<Select | null> | null
  ) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const spaceProps = getSubset(props, propTypes.space);
    const error = !!(errorMessage || errorList);
    const optionsRef = React.useRef(options);

    const componentSize = useComponentSize(size);

    React.useEffect(() => {
      checkOptionsAreValid(options);
      optionsRef.current = options;
    }, [options]);

    return (
      <Field {...spaceProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
          <WindowedSelect
            windowThreshold={windowThreshold}
            className={className}
            classNamePrefix={classNamePrefix}
            noOptionsMessage={noOptionsMessage}
            defaultValue={getReactSelectValue(options, defaultValue)}
            value={getReactSelectValue(options, value)}
            ref={ref}
            placeholder={placeholder || t("start typing")}
            styles={customStyles({
              theme,
              error,
              maxHeight,
              windowed: options.length > windowThreshold,
            })}
            options={options}
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
