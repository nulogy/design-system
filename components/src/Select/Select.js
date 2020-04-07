import React from "react";
import WindowedSelect, { components as selectComponents } from "react-windowed-select";
import { useTranslation } from "react-i18next";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import customStyles from "./customReactSelectStyles";
import { SelectPropTypes, SelectDefaultProps } from "./Select.type";
import SelectOption from "./SelectOption";

const WINDOW_THRESHOLD = 100; // number of options beyond which the menu will be windowed

const Control = props => {
  // eslint-disable-next-line react/prop-types
  const { isFocused } = props;
  return (
    <div data-testid="select-control">
      <selectComponents.Control className={isFocused ? "nds-select--is-focused" : null} {...props} />
    </div>
  );
};

const MultiValue = props => {
  return (
    <div data-testid="select-multivalue">
      <selectComponents.MultiValue {...props} />
    </div>
  );
};

const ClearIndicator = props => {
  return (
    <div data-testid="select-clear">
      <selectComponents.ClearIndicator {...props} />
    </div>
  );
};

const Menu = props => {
  return (
    <div data-testid="select-dropdown">
      <selectComponents.Menu {...props} />
    </div>
  );
};

const SelectContainer = props => {
  return (
    <div data-testid="select-container">
      <selectComponents.SelectContainer {...props} />
    </div>
  );
};

const Input = props => {
  return (
    <div data-testid="select-input">
      <selectComponents.Input {...props} />
    </div>
  );
};

const getOption = (options, value) => {
  if (value == null || value === "") return value;

  return options.find(o => o.value === value);
};

const getReactSelectValue = (options, input) => {
  if (Array.isArray(input)) {
    return input.map(i => getOption(options, i));
  }

  return getOption(options, input);
};

const extractValue = (options, isMulti) => {
  if (options == null) return options;

  if (isMulti) {
    return options.map(o => o.value);
  } else {
    return options.value;
  }
};

const ReactSelect = ({
  autocomplete,
  options,
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
  "aria-label": ariaLabel
}) => {
  const { t } = useTranslation();
  return (
    <Field>
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
        <WindowedSelect
          className={className}
          classNamePrefix={classNamePrefix}
          noOptionsMessage={noOptionsMessage}
          placeholder={placeholder || t("select ...")}
          options={options}
          labelText={labelText}
          windowThreshold={WINDOW_THRESHOLD}
          styles={customStyles({ error, maxHeight, windowed: options.length > WINDOW_THRESHOLD })}
          isDisabled={disabled}
          isSearchable={autocomplete}
          aria-required={required}
          aria-invalid={error}
          defaultMenuIsOpen={initialIsOpen}
          inputId={id}
          onBlur={onBlur}
          onChange={onChange && (option => onChange(extractValue(option, multiselect)))}
          defaultValue={getReactSelectValue(options, defaultValue)}
          value={getReactSelectValue(options, value)}
          name={name}
          isMulti={multiselect}
          menuIsOpen={menuIsOpen}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          menuPosition={menuPosition}
          onInputChange={onInputChange}
          components={{
            Option: SelectOption,
            Control,
            MultiValue,
            ClearIndicator,
            SelectContainer,
            Menu,
            Input,
            ...components
          }}
          aria-label={ariaLabel}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </MaybeFieldLabel>
    </Field>
  );
};

ReactSelect.propTypes = SelectPropTypes;

ReactSelect.defaultProps = SelectDefaultProps;

export default ReactSelect;
