import React from "react";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import Select from "react-select";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import theme from "../theme";
import { subPx } from "../utils";

const getBorderColor = ({ error, disabled, isOpen, isFocused }) => {
  const { red, lightGrey, blue, grey } = theme.colors;

  if (error) {
    return red;
  }

  if (disabled) {
    return lightGrey;
  }
  if (isOpen || isFocused) {
    return blue;
  }

  return grey;
};

const customStyles = error => {
  return {
    option: (provided, state) => ({
      padding: subPx(theme.space.x1),
      fontWeight: state.isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
      background: state.isFocused ? theme.colors.lightBlue : null
    }),
    control: (provided, state) => ({
      display: "flex",
      position: "relative",
      fontFamily: theme.fonts.base,
      width: "100%",
      fontSize: theme.fontSizes.medium,
      lineHeight: theme.lineHeights.base,
      background: state.isDisabled ? theme.colors.whiteGrey : theme.colors.white,
      border: `1px solid ${theme.colors.grey}`,
      borderColor: getBorderColor({
        error,
        disabled: state.isDisabled,
        isOpen: state.selectProps.menuIsOpen,
        isFocused: state.isFocused
      }),
      boxShadow: state.selectProps.menuIsOpen ? theme.shadows.focus : null,
      borderRadius: theme.radii.medium,
      borderBottomLeftRadius: state.selectProps.menuIsOpen ? 0 : theme.radii.medium,
      "&:hover, &:focus": {
        borderColor: getBorderColor({
          error,
          disabled: state.isDisabled,
          isOpen: state.selectProps.menuIsOpen,
          isFocused: true
        })
      }
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isHovered ? theme.colors.blackBlue : theme.colors.grey
    }),
    valueContainer: provided => ({
      ...provided,
      padding: subPx(theme.space.x1)
    }),
    menu: (provided, state) => ({
      marginTop: 0,
      position: "absolute",
      zIndex: "100",
      width: "100%",
      background: theme.colors.white,
      borderWidth: "1px",
      borderColor: getBorderColor({
        error,
        isOpen: true,
        disabled: state.isDisabled,
        isFocused: false
      }),
      borderBottomStyle: "solid",
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
      boxShadow: theme.shadows.focus
    }),
    menuList: provided => ({
      ...provided,
      padding: 0
    }),
    placeholder: (provided, state) => ({
      color: state.isDisabled ? transparentize(0.6667, theme.colors.black) : "hsl(0,0%,50%)"
    })
  };
};

const getValue = (opts, val) => opts.find(o => o.value === val);

const ReactSelect = ({
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
  name,
  onChange,
  placeholder,
  value
}) => (
  <Field>
    <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
      <Select
        placeholder={placeholder}
        options={options}
        labelText={labelText}
        styles={customStyles(error)}
        isDisabled={disabled}
        isSearchable={false}
        aria-required={required}
        aria-invalid={error}
        defaultMenuIsOpen={initialIsOpen}
        maxMenuHeight={maxHeight}
        inputId={id}
        onChange={onChange}
        value={getValue(options, value)}
        name={name}
      />
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </MaybeFieldLabel>
  </Field>
);

ReactSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  disabled: false,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  labelText: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string,
  id: PropTypes.string,
  initialIsOpen: PropTypes.bool,
  maxHeight: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};
ReactSelect.defaultProps = {
  disabled: null,
  error: undefined,
  errorMessage: null,
  errorList: null,
  labelText: null,
  helpText: null,
  requirementText: null,
  id: null,
  initialIsOpen: undefined,
  maxHeight: "256px",
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  required: false,
  value: undefined
};

export default ReactSelect;
