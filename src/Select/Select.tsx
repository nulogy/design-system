import React, { forwardRef, ReactNode, MutableRefObject } from "react";
import Select from "react-select/base";
import ReactSelect, { PropsValue } from "react-select";
import type { GroupBase, Props } from "react-select";
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
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectInput,
  SelectDropdownIndicator,
  SelectMenu,
  SelectOption,
} from "../AsyncSelect/AsyncSelectComponents";
import { checkOptionsAreValid, extractValue, getReactSelectValue } from "./lib";

export type NDSOptionValue = string | number | boolean | null;

export interface NDSOption {
  label: string;
  value: NDSOptionValue;
}

type CustomProps<IsMulti extends boolean, Group extends GroupBase<NDSOption>> = {
  autocomplete?: Props<NDSOption, IsMulti, Group>["isSearchable"];
  labelText?: string;
  size?: ComponentSize;
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
};

export type NDSSelectProps<
  IsMulti extends boolean = boolean,
  Group extends GroupBase<NDSOption> = GroupBase<NDSOption>
> = Omit<Props<NDSOption, IsMulti, Group>, keyof CustomProps<IsMulti, Group>> & CustomProps<IsMulti, Group>;

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
      ...props
    }: NDSSelectProps<IsMulti, Group>,
    ref:
      | ((instance: Select<NDSOption, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<NDSOption, IsMulti, Group> | null>
      | null
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
            // windowThreshold={windowThreshold}
            placeholder={placeholder || t("start typing")}
            aria-required={required}
            required={required}
            aria-invalid={error}
            inputId={id}
            styles={customStyles<NDSOption, IsMulti, Group>({
              theme: theme,
              error,
              maxHeight,
              size: componentSize,
              windowed: options.length > windowThreshold,
            })}
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
            {...props}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
);

export default NDSSelect;
