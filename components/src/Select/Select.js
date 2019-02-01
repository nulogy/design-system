import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import theme from "../theme";

const getCustomStyles = error => (
  {
    control: (base, state) => ({
      ...base,
      padding: 0,
      borderTopLeftRadius: theme.radii[1],
      borderTopRightRadius: theme.radii[1],
      borderBottomLeftRadius: state.isFocused ? 0 : theme.radii[1],
      borderBottomRightRadius: state.isFocused ? 0 : theme.radii[1],
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
      padding: theme.space[2],
      fontWeight: state.isSelected ? "bold" : "normal",
      background: state.isSelected ? "none" : "default",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  }
);

const Select = props => (
  <ReactSelect
    styles={ getCustomStyles(props.error) }
    blurInputOnSelect="true"
    { ...props }
  />
);

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

Select.defaultProps = {
  error: false,
};

export default Select;
