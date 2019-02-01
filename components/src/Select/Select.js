import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import theme from "../theme";
import { subPx } from "../utils";

const getCustomStyles = error => (
  {
    control: (base, state) => ({
      ...base,
      padding: 0,
      borderTopLeftRadius: theme.radii[1],
      borderTopRightRadius: theme.radii[1],
      boxShadow: state.isFocused ? theme.boxShadows[0] : "none",
      outline: "none",
      borderColor: error ? theme.colors.red : (state.isDisabled ? theme.colors.lightGrey : (state.isFocused ? theme.colors.blue : theme.colors.grey)),
      background: state.isDisabled ? theme.colors.whiteGrey : theme.colors.white,
      "&:hover": {
        borderColor: error ? theme.colors.red : theme.colors.blue,
      },
    }),
    menu: base => ({
      ...base,
      borderColor: error ? theme.colors.red : theme.colors.blue,
      borderWidth: "1px",
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      marginTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      boxShadow: theme.boxShadows[0],
    }),
    menuList: base => ({
      ...base,
      padding: "0px",
      borderColor: error ? theme.colors.red : theme.colors.blue,
      borderWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomLeftRadius: theme.radii[1],
      borderBottomRightRadius: theme.radii[1],
    }),
    option: (base, state) => ({
      ...base,
      color: theme.colors.black,
      padding: subPx(theme.space[2]),
      fontWeight: state.isSelected ? "bold" : "normal",
      background: state.isSelected ? "none" : "default",
      "&:hover": {
        background: theme.colors.lightBlue,
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  }
);

// https://github.com/JedWatson/react-select/issues/1827#issuecomment-409343434
const InnerSelect = ({
  error,
  ...props
}) => (
  <ReactSelect
    styles={ getCustomStyles(error) }
    blurInputOnSelect="true"
    { ...props }
  />
);

InnerSelect.propTypes = {
  error: PropTypes.bool,
};

InnerSelect.defaultProps = {
  error: false,
};

const Select = ({
  value,
  required,
  onChange,
  ...props
}) => (
  <div>
    <InnerSelect
      ref={ ref => { this.select = ref; } }
      { ...props }
    />
    <input
      tabIndex={ -1 }
      value={ value }
      required={ required }
      onChange={ onChange }
      style={ {
        opacity: 0,
        width: 0,
        height: 0,
        position: "absolute",
      } }
      onFocus={ () => this.select.focus() }
    />
  </div>
);

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  value: null,
  required: false,
  onChange: null,
};

export default Select;
