import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import styled from "styled-components";
import theme from "../theme";
import { subPx } from "../utils";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Box from "../Box/Box";

const getBorderColor = (errored, focused, disabled) => {
  if (errored) { return theme.colors.red; }
  if (disabled) { return theme.colors.lightGrey; }
  if (focused) { return theme.colors.blue; }

  return theme.colors.grey;
};

const getCustomStyles = error => (
  {
    control: (base, { isDisabled, isFocused }) => ({
      ...base,
      paddingLeft: subPx(theme.space[2]),
      paddingRight: subPx(theme.space[2]),
      borderTopLeftRadius: theme.radii[1],
      borderTopRightRadius: theme.radii[1],
      boxShadow: isFocused ? theme.boxShadows[0] : "none",
      outline: "none",
      borderColor: getBorderColor(error, isFocused, isDisabled),
      background: isDisabled ? theme.colors.whiteGrey : theme.colors.white,
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

const SelectBox = styled.div([], ({ error, isFocused, isDisabled }) => ({
  display: "flex",
  padding: 0,
  border: "1px solid",
  // borderLeft: "solid",
  // borderRight: "solid",
  // borderTop: "solid",
  borderTopLeftRadius: theme.radii[1],
  borderTopRightRadius: theme.radii[1],
  boxShadow: isFocused ? theme.boxShadows[0] : "none",
  outline: "none",
  borderColor: getBorderColor(error, isFocused, isDisabled),
  background: isDisabled ? theme.colors.whiteGrey : theme.colors.white,
  "&:hover": {
    borderColor: error ? theme.colors.red : theme.colors.blue,
  },
}));

const Input = styled.input([], ({ error, isFocused, isDisabled }) => ({
  width: "100%",
  paddingLeft: subPx(theme.space[2]),
  paddingRight: subPx(theme.space[2]),
  border: "none",
  borderTopLeftRadius: theme.radii[1],
  borderTopRightRadius: theme.radii[1],
  boxShadow: isFocused ? theme.boxShadows[0] : "none",
  outline: "none",
  borderColor: getBorderColor(error, isFocused, isDisabled),
  background: isDisabled ? theme.colors.whiteGrey : theme.colors.white,
  "&:hover": {
    borderColor: theme.colors.blue,
  },
}));

const IndicatorButton = styled.div([], () => ({
  border: "none",
  background: "none",
  padding: `${subPx(theme.space[2], 1)} ${theme.space[3]}`,
}));

const ToggleButton = ({ isOpen }) => (
  <IndicatorButton>
    {
      isOpen
        ? "^"
        : "v"
    }
  </IndicatorButton>
);

const Menu = styled.div([], ({ error, isFocused, isDisabled }) => ({
  // from menu
  borderColor: getBorderColor(error, isFocused, isDisabled),
  borderWidth: "1px",
  borderLeftStyle: "solid",
  borderRightStyle: "solid",
  marginTop: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  boxShadow: theme.boxShadows[0],


  // from menuList
  padding: "0px",
  // borderColor: error ? theme.colors.red : theme.colors.blue,
  // borderWidth: "1px",
  borderBottomStyle: "solid",
  // borderTopLeftRadius: 0,
  // borderTopRightRadius: 0,
  borderBottomLeftRadius: theme.radii[1],
  borderBottomRightRadius: theme.radii[1],
  background: isDisabled ? theme.colors.whiteGrey : theme.colors.white,
}));

const MenuItem = styled.div([], ({ isSelected }) => ({
  color: theme.colors.black,
  padding: subPx(theme.space[2]),
  fontWeight: isSelected ? "bold" : "normal",
  background: isSelected ? "none" : "default",
  "&:hover": {
    background: theme.colors.lightBlue,
  },
}));

const items = [1, 2, 3];
const Select = () => (
  <Downshift>
    {
      ({
        getMenuProps,
        getItemProps,
        getInputProps,
        getToggleButtonProps,
        isOpen,
        selectedItem,
      }) => (
        <div>
          <SelectBox { ...getToggleButtonProps() }>
            <Input { ...getInputProps() } readOnly value={ selectedItem } />
            <ToggleButton isOpen={ isOpen } />
          </SelectBox>
          <Menu { ...getMenuProps() }>
            {
              isOpen
                ? items.map((item, index) => <MenuItem { ...getItemProps({ key: item, index, item }) }>{item}</MenuItem>)
                : null
            }
          </Menu>
        </div>
      )
    }
  </Downshift>
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
