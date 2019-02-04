import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import theme from "../theme";
import { subPx } from "../utils";

const getCustomStyles = error => (
  {
    control: (base, state) => ({
      ...base,
      paddingLeft: subPx(theme.space[2]),
      paddingRight: subPx(theme.space[2]),
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
    placeholder: base => ({
      ...base,
      marginLeft: 0,
      marginRight: 0
    }),
    singleValue: base => ({
      ...base,
      marginLeft: 0,
      marginRight: 0,
      color: theme.colors.black
    }),
    menuList: base => ({
      ...base,
      padding: "0px",
      borderColor: error ? theme.colors.red : theme.colors.blue,
      borderWidth: "1px",
      borderBottomStyle: "solid",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: theme.radii[1],
      borderBottomRightRadius: theme.radii[1],
    }),
    valueContainer: () => ({
      padding: 0,
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

const Select = ({
  error,
  ...props
}) => (
  <ReactSelect
    styles={ getCustomStyles(error) }
    { ...props }
  />
);

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  // options: PropTypes.arrayOf(PropTypes.shape([{
  //   label: PropTypes.string,
  //   value: PropTypes.string,
  // }])).isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.bool
};

Select.defaultProps = {
  value: undefined,
  required: false,
  onChange: null,
  error: false
};

export default Select;
