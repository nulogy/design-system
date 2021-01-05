import React, { useContext, forwardRef } from "react";
import AsyncReactSelect from "react-select/async";
import { useTranslation } from "react-i18next";
import styled, { ThemeContext } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "../Select/customReactSelectStyles";
import { SelectOption } from "../Select/SelectOption";
import {
  SelectControl,
  SelectMultiValue,
  SelectClearIndicator,
  SelectContainer,
  SelectMenu,
  SelectInput,
} from "../Select";
import { SelectDefaultProps } from "../Select/Select";
import { getSubset } from "../utils/subset";

const StyledAsyncReactSelect = styled(AsyncReactSelect)(({ showArrow }) => ({
  // These classes are only applied when classname prefix is set
  "[class*='dropdown-indicator'], [class*='indicator-separator']": {
    display: showArrow ? "flex" : "none",
  },
}));
type AsyncSelectProps = any;

const AsyncSelect: React.SFC<AsyncSelectProps> = forwardRef(
  (
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
      cacheOptions,
      defaultOptions,
      loadOptions,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const spaceProps = getSubset(props, propTypes.space);
    return (
      <Field {...spaceProps}>
        <MaybeFieldLabel
          labelText={labelText}
          requirementText={requirementText}
          helpText={helpText}
        >
          <StyledAsyncReactSelect
            className={className}
            classNamePrefix={classNamePrefix}
            noOptionsMessage={noOptionsMessage}
            value={value}
            ref={ref}
            defaultInputValue={defaultValue}
            placeholder={placeholder || t("select ...")}
            labelText={labelText}
            styles={customStyles({
              theme: themeContext,
              error,
              maxHeight,
              windowed: false,
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
            theme={themeContext}
            components={{
              Option: SelectOption,
              Control: SelectControl,
              MultiValue: SelectMultiValue,
              ClearIndicator: SelectClearIndicator,
              SelectContainer: SelectContainer,
              Menu: SelectMenu,
              Input: SelectInput,
              ...components,
            }}
            showArrow={defaultOptions}
            aria-label={ariaLabel}
            cacheOptions={cacheOptions}
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
          />
          <InlineValidation
            mt="x1"
            errorMessage={errorMessage}
            errorList={errorList}
          />
        </MaybeFieldLabel>
      </Field>
    );
  }
);
AsyncSelect.defaultProps = {
  ...SelectDefaultProps,
  cacheOptions: false,
  defaultOptions: undefined,
};
export default AsyncSelect;
