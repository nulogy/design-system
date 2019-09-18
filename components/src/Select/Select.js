import React from "react";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import Select from "react-select";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import theme from "../theme";
import { subPx } from "../utils";

const getBorderColor = ({ errored, disabled, isOpen, isFocused }) => {
  const { red, lightGrey, blue, grey } = theme.colors;

  if (errored) {
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

const getShadow = ({ errored, isOpen }) => {
  const { focus, error } = theme.shadows;

  if (isOpen) {
    if (errored) {
      return error;
    } else {
      return focus;
    }
  } else {
    return null;
  }
};

const customStyles = error => {
  return {
    option: (provided, state) => ({
      padding: subPx(theme.space.x1),
      fontWeight: state.isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
      background: state.isFocused ? theme.colors.lightBlue : null,
      "&:last-child": {
        borderBottomLeftRadius: theme.radii.medium,
        borderBottomRightRadius: theme.radii.medium
      }
    }),
    control: (provided, state) => ({
      display: "flex",
      height: theme.space.x5,
      paddingLeft: theme.space.x1,
      position: "relative",
      fontFamily: theme.fonts.base,
      width: "100%",
      fontSize: theme.fontSizes.medium,
      lineHeight: theme.lineHeights.base,
      background: state.isDisabled ? theme.colors.whiteGrey : theme.colors.white,
      border: `1px solid ${theme.colors.grey}`,
      borderColor: getBorderColor({
        errored: error,
        disabled: state.isDisabled,
        isOpen: state.selectProps.menuIsOpen,
        isFocused: state.isFocused
      }),
      boxShadow: getShadow({ errored: error, isOpen: state.selectProps.menuIsOpen }),
      borderRadius: theme.radii.medium,
      borderBottomLeftRadius: state.selectProps.menuIsOpen ? 0 : theme.radii.medium,
      "&:hover, &:focus": {
        borderColor: getBorderColor({
          errored: error,
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
    input: () => ({}),
    valueContainer: provided => ({
      ...provided,
      padding: 0
    }),
    menu: (provided, state) => ({
      marginTop: 0,
      position: "absolute",
      zIndex: "100",
      width: "100%",
      background: theme.colors.white,
      borderWidth: "1px",
      borderColor: getBorderColor({
        errored: error,
        isOpen: true,
        disabled: state.isDisabled,
        isFocused: false
      }),
      borderBottomStyle: "solid",
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
      boxShadow: getShadow({ errored: error, isOpen: true })
    }),
    menuList: provided => ({
      ...provided,
      padding: 0
    }),
    multiValue: provided => ({
      ...provided,
      background: theme.colors.lightGrey,
      color: theme.colors.black,
      margin: `0 ${theme.space.x1} 0 0`,
      "&:last-child": {
        marginRight: theme.space.half
      }
    }),
    multiValueLabel: () => ({
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      color: theme.colors.black,
      borderRadius: theme.radii.small,
      fontSize: theme.fontSizes.small,
      padding: theme.space.half,
      paddingLeft: theme.space.x1
    }),
    multiValueRemove: provided => ({
      ...provided,
      svg: { fill: theme.colors.black },
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      "&:hover": {
        background: theme.colors.darkGrey,
        cursor: "pointer",
        svg: { fill: theme.colors.white }
      }
    }),
    noOptionsMessage: provided => ({
      ...provided,
      color: theme.colors.black,
      fontSize: "14px"
    }),
    placeholder: (provided, state) => ({
      color: state.isDisabled ? transparentize(0.6667, theme.colors.black) : "hsl(0,0%,50%)"
    })
  };
};

const getValue = (opts, val) => {
  if (val === "") {
    return "";
  }
  return opts.find(o => o.value === val);
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
  multiselect,
  name,
  onChange,
  placeholder,
  value,
  defaultValue,
  className,
  classNamePrefix
}) => (
  <Field>
    <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
      <Select
        className={className}
        classNamePrefix={classNamePrefix}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        options={options}
        labelText={labelText}
        styles={customStyles(error)}
        isDisabled={disabled}
        isSearchable={autocomplete}
        aria-required={required}
        aria-invalid={error}
        defaultMenuIsOpen={initialIsOpen}
        maxMenuHeight={maxHeight}
        inputId={id}
        onChange={onChange && (option => onChange(option && option.value))}
        defaultValue={getValue(options, defaultValue)}
        value={getValue(options, value)}
        name={name}
        isMulti={multiselect}
      />
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </MaybeFieldLabel>
  </Field>
);

ReactSelect.propTypes = {
  autocomplete: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  labelText: PropTypes.string,
  helpText: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  requirementText: PropTypes.string,
  id: PropTypes.string,
  initialIsOpen: PropTypes.bool,
  maxHeight: PropTypes.string,
  multiselect: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string
};
ReactSelect.defaultProps = {
  autocomplete: true,
  disabled: null,
  defaultValue: undefined,
  error: undefined,
  errorMessage: null,
  errorList: null,
  labelText: null,
  helpText: null,
  noOptionsMessage: () => null,
  requirementText: null,
  id: null,
  initialIsOpen: undefined,
  maxHeight: "248px",
  multiselect: false,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  required: false,
  value: undefined,
  className: null,
  classNamePrefix: undefined
};

export default ReactSelect;
