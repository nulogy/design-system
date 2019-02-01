import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import theme from "../theme";

const customStyles = {
  control: (base, state) => ({
    ...base,
    padding: 0,
    borderTopLeftRadius: theme.radii[1],
    borderTopRightRadius: theme.radii[1],
    borderBottomLeftRadius: state.isFocused ? 0 : theme.radii[1],
    borderBottomRightRadius: state.isFocused ? 0 : theme.radii[1],
    borderColor: state.isFocused ? theme.colors.blue : theme.colors.grey,
    boxShadow: state.isFocused ? theme.boxShadows[0] : "none",
    outline: "none",
    borderColor: state.isDisabled ? theme.colors.lightGrey : (state.isFocused ? theme.colors.blue : theme.colors.grey),
    background: state.isDisabled ? theme.colors.whiteGrey : theme.colors.white,
    "&:hover": {
      borderColor: theme.colors.blue,
    },
  }),
  menu: base => ({
    ...base,
    borderColor: theme.colors.blue,
    borderWidth: "1px",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.radii[1],
    borderBottomRightRadius: theme.radii[1],
    boxShadow: theme.boxShadows[0],
  }),
  menuList: base => ({
    ...base,
    padding: "0px",
    borderColor: theme.colors.blue,
    borderWidth: "1px",
  }),
  option: (base, state) => ({
    ...base,
    color: theme.colors.black,
    padding: theme.space[2],
    fontWeight: state.isSelected ? 'bold' : 'normal',
    background: state.isSelected ? "none" : "default",
    "&:last-child": {
      // fixes overlap with container border
      borderBottomLeftRadius: theme.radii[1],
      borderBottomRightRadius: theme.radii[1],
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const Select = props => (
  <ReactSelect
    styles={ customStyles }
    blurInputOnSelect="true"
    { ...props }
  />
);

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default Select;
