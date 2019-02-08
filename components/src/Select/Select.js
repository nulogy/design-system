import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import theme from "../theme";
import { subPx } from "../utils";

const getBorderColor = (errored, isOpen, disabled, isFocused) => {
  if (errored) { return theme.colors.red; }
  if (disabled) { return theme.colors.lightGrey; }
  if (isOpen || isFocused) { return theme.colors.blue; }

  return theme.colors.grey;
};

const SelectBox = styled.div([], ({ error, isOpen, disabled }) => ({
  display: "flex",
  position: "relative",
  padding: 0,
  borderRadius: theme.radii[1],
  boxShadow: isOpen ? theme.boxShadows[0] : "none",
  outline: "none",
  borderColor: getBorderColor(error, isOpen, disabled, false),
  background: disabled ? theme.colors.whiteGrey : theme.colors.white,
  "&:hover": {
    borderColor: getBorderColor(error, isOpen, disabled, true)
  },
}));

const Input = styled.input([], ({ error, isOpen, disabled }) => ({
  fontFamily: theme.fonts.base,
  width: "100%",
  color: theme.colors.black,
  fontSize: theme.fontSizes[1],
  padding: subPx(theme.space[2]),
  lineHeight: theme.lineHeights.base,
  border: "1px solid",
  borderColor: getBorderColor(error, isOpen, disabled, false),
  borderTopLeftRadius: theme.radii[1],
  borderTopRightRadius: theme.radii[1],
  borderBottomLeftRadius: isOpen ? 0 : theme.radii[1],
  borderBottomRightRadius: isOpen ? 0 : theme.radii[1],
  boxShadow: isOpen ? theme.boxShadows[0] : "none",
  outline: "none",
  background: disabled ? theme.colors.whiteGrey : theme.colors.white,
  "&:hover": {
    cursor: "default",
    borderColor: getBorderColor(error, isOpen, disabled, true),
  },
}));

const IndicatorButton = styled.div([], () => ({
  position: "absolute",
  top: theme.space[2],
  right: theme.space[1],
  bottom: "0",
  pointerEvents: "none",
}));

const ToggleButton = ({ isOpen }) => (
  <IndicatorButton>
    {
      isOpen
        ? <Icon name="upArrow" />
        : <Icon name="downArrow" />
    }
  </IndicatorButton>
);

const Menu = styled.div([], ({ error, disabled }) => ({
  position: "absolute",
  width: "100%",
  borderWidth: "1px",
  borderColor: getBorderColor(error, true, disabled, false),
  borderBottomStyle: "solid",
  borderLeftStyle: "solid",
  borderRightStyle: "solid",
  borderRadius: `0 ${theme.radii[1]}`,
  marginTop: 0,
  boxShadow: theme.boxShadows[0],
  background: disabled ? theme.colors.whiteGrey : theme.colors.white,
}));

const MenuItem = styled.div([], ({ isSelected, isActive }) => ({
  color: theme.colors.black,
  padding: subPx(theme.space[2]),
  fontWeight: isSelected ? "bold" : "normal",
  background: isActive ? theme.colors.lightBlue : null,
  "&:hover": {
    background: theme.colors.lightBlue,
  },
  "&:last-child": {
    borderRadius: `0 ${theme.radii[1]}`,
  },
}));

const Select = ({
  error, onChange, disabled, options, optionToString, value, required, placeholder, defaultIsOpen
}) => (
  <Downshift
    itemToString={ optionToString }
    selectedItem={ value }
    onChange={ onChange }
    defaultHighlightedIndex={ 0 }
    defaultIsOpen={ defaultIsOpen }
  >
    {
      ({
        getMenuProps,
        getItemProps,
        getInputProps,
        getToggleButtonProps,
        isOpen,
        selectedItem,
        highlightedIndex,
      }) => (
        <div style={ { position: "relative" } }>
          <SelectBox { ...getToggleButtonProps({ disabled, error, isOpen }) }>
            <Input
              { ...getInputProps({ disabled, error, isOpen }) } required={ required }
              value={ selectedItem && selectedItem.label } placeholder={ placeholder }
            />
            <ToggleButton isOpen={ isOpen } />
          </SelectBox>
          {
            isOpen
              ? (
                <Menu { ...getMenuProps({ error }) }>
                  {
                    isOpen
                      ? options.map((option, index) => (
                        <MenuItem
                          { ...getItemProps({
                            key: option.value,
                            item: option,
                            isSelected: selectedItem === option,
                            isActive: highlightedIndex === index,
                            index,
                            disabled,
                          }) }
                        >
                          {option.label}
                        </MenuItem>
                      ))
                      : null
                  }
                </Menu>
              )
              : null
          }
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
  error: PropTypes.bool,
  defaultIsOpen: PropTypes.bool,
};

Select.defaultProps = {
  value: undefined,
  required: false,
  onChange: undefined,
  error: false,
  defaultIsOpen: false,
};

export default Select;
