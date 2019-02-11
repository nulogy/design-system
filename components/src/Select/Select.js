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

const SelectBox = styled.div([], () => ({
  display: "flex",
  position: "relative",
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
  "&:hover, &:focus": {
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
        ? <Icon icon="upArrow" />
        : <Icon icon="downArrow" />
    }
  </IndicatorButton>
);

ToggleButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

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
  zIndex: 100,
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
  error, onChange, disabled, options, optionToString, value, required, placeholder, initialIsOpen,
}) => (
  <Downshift
    itemToString={ optionToString }
    selectedItem={ value }
    onChange={ onChange }
    defaultHighlightedIndex={ 0 }
    initialIsOpen={ initialIsOpen }
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
              { ...getInputProps({ disabled, error, isOpen }) } aria-required={ required }
              placeholder={ placeholder }
              readOnly
            />
            <ToggleButton isOpen={ isOpen } />
          </SelectBox>
          {
            isOpen
              && (
                <Menu { ...getMenuProps({ error }) }>
                  {
                    options.map((option, index) => (
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
                  }
                </Menu>
              )
          }
        </div>
      )
    }
  </Downshift>
);

Select.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.shape({}),
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  optionToString: PropTypes.func,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  initialIsOpen: PropTypes.bool,
};

const extractLabelFromOption = option => option.label;

Select.defaultProps = {
  value: undefined,
  required: false,
  onChange: undefined,
  error: false,
  disabled: false,
  initialIsOpen: undefined,
  placeholder: undefined,
  optionToString: extractLabelFromOption,
};

export default Select;
