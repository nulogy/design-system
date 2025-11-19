import React, { forwardRef, ReactNode, MutableRefObject } from "react";
import Select from "react-select/base";
import ReactSelect, { MenuPlacement, MenuPosition, PropsValue } from "react-select";
import type { GroupBase, Props, StylesConfig } from "react-select";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { getSubset } from "../utils/subset";
import numberFromDimension from "../utils/numberFromDimension";
import { addStyledProps, StyledProps } from "../StyledProps";
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
import { calcOptionsLength, checkOptionsAreValid, CustomOnChangeValue, extractValue, getReactSelectValue } from "./lib";
import { FieldLabelProps } from "../FieldLabel/FieldLabel.type";

export type NDSOptionValue = string | number | boolean | null;

export interface NDSOption {
  label: ReactNode;
  value: NDSOptionValue;
}

interface CustomProps<Option extends NDSOption, IsMulti extends boolean, Group extends GroupBase<Option>>
  extends StyledProps {
  autocomplete?: Props<Option, IsMulti, Group>["isSearchable"];
  // @see FieldLabel
  labelText?: FieldLabelProps["labelText"];
  // @see FieldLabel
  requirementText?: FieldLabelProps["requirementText"];
  // @see FieldLabel
  hint?: FieldLabelProps["hint"];
  // @see FieldLabel
  helpText?: FieldLabelProps["helpText"];
  disabled?: Props<Option, IsMulti, Group>["isDisabled"];
  errorMessage?: string;
  errorList?: string[];
  initialIsOpen?: Props<Option, IsMulti, Group>["defaultMenuIsOpen"];
  multiselect?: Props<Option, IsMulti, Group>["isMulti"];
  maxHeight?: string;
  defaultValue?: PropsValue<Option["value"]>;
  value?: PropsValue<Option["value"]>;
  options: readonly Option[];
  onChange?: (newValue: CustomOnChangeValue<IsMulti>) => void;
  windowThreshold?: number;
  styles?: (selectStyles: StylesConfig<Option, IsMulti, Group>) => StylesConfig<Option, IsMulti, Group>;
}

export type NDSSelectProps<
  Option extends NDSOption = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<
  Props<Option, IsMulti, Group>,
  keyof CustomProps<Option, IsMulti, Group> | "isSearchable" | "isDisabled" | "defaultMenuIsOpen" | "isMulti" | "styles"
> &
  CustomProps<Option, IsMulti, Group>;

const NDSSelect = forwardRef(
  <
    Option extends NDSOption = NDSOption,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>,
  >(
    {
      value,
      onChange,
      defaultValue,
      disabled,
      errorMessage,
      errorList,
      id,
      initialIsOpen,
      multiselect,
      placeholder,
      components,
      options,
      styles,
      windowThreshold = 300,
      autocomplete = true,
      maxHeight = "248px",
      required = false,
      menuPosition = "absolute" as MenuPosition,
      menuPlacement = "bottom" as MenuPlacement,
      classNamePrefix = "ndsSelect",
      closeMenuOnSelect = true,
      noOptionsMessage,
      ...props
    }: NDSSelectProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const { t } = useTranslation();
    const variant = useComponentVariant();
    const theme = useTheme();
    const styledProps = getSubset(props, addStyledProps);
    const error = !!(errorMessage || errorList);
    const optionsRef = React.useRef(options);
    const optionsLength = React.useMemo(() => calcOptionsLength(options), [options]);
    const isWindowed = optionsLength >= windowThreshold;
    const { labelText, requirementText, helpText, hint } = props;
    const fieldLabelProps = { labelText, requirementText, helpText, hint };
    noOptionsMessage ||= () => t("no options");

    React.useEffect(() => {
      checkOptionsAreValid(options);
      optionsRef.current = options;
    }, [options]);

    const stylesConfig = customStyles<Option, IsMulti, Group>({
      theme: theme,
      error,
      variant,
      maxHeight,
      windowed: options.length > windowThreshold,
    });

    return (
      <Field {...styledProps}>
        <MaybeFieldLabel {...fieldLabelProps}>
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
              Option: (props) => <SelectOption {...props}>{props.children}</SelectOption>,
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
            closeMenuOnSelect={closeMenuOnSelect}
            classNamePrefix={classNamePrefix}
            menuPosition={menuPosition}
            menuPlacement={menuPlacement}
            maxMenuHeight={numberFromDimension(maxHeight)}
            noOptionsMessage={noOptionsMessage}
            {...props}
          />
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </MaybeFieldLabel>
      </Field>
    );
  }
) as <
  Option extends NDSOption = NDSOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: NDSSelectProps<Option, IsMulti, Group> & React.RefAttributes<Select<Option, IsMulti, Group>>
) => React.ReactElement;

export default NDSSelect;
