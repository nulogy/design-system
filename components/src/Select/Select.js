import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import styled from "styled-components";
import { transparentize } from "polished";
import { Icon } from "ComponentsRoot";
import theme from "../theme";
import { subPx } from "../Utils";

const getBorderColor = ({
  error, disabled, isOpen,
  isFocused,
}) => {
  const {
    red, lightGrey, blue,
    grey,
  } = theme.colors;

  if (error) { return red; }
  if (disabled) { return lightGrey; }
  if (isOpen || isFocused) { return blue; }

  return grey;
};

const SelectBox = styled.div(({ disabled }) => ({
  display: "flex",
  position: "relative",
  color: disabled ? transparentize(0.6667, theme.colors.black) : null,
}));

const Input = styled.input(({ error, isOpen, disabled }) => ({
  fontFamily: theme.fonts.base,
  width: "100%",
  color: theme.colors.black,
  fontSize: theme.fontSizes[1],
  padding: subPx(theme.space[2]),
  lineHeight: theme.lineHeights.base,
  border: "1px solid",
  borderColor: getBorderColor({
    isOpen,
    disabled,
    error,
    isFocused: false,
  }),
  borderTopLeftRadius: theme.radii.medium,
  borderTopRightRadius: theme.radii.medium,
  borderBottomLeftRadius: isOpen ? 0 : theme.radii.medium,
  borderBottomRightRadius: isOpen ? 0 : theme.radii.medium,
  boxShadow: isOpen ? theme.boxShadows[0] : "none",
  outline: "none",
  background: disabled ? theme.colors.whiteGrey : theme.colors.white,
  "&:hover, &:focus": {
    cursor: "default",
    borderColor: getBorderColor({
      error,
      isOpen,
      disabled,
      isFocused: true,
    }),
  },
  "&::placeholder": {
    color: disabled ? transparentize(0.6667, theme.colors.black) : null,
  },
}));

const IndicatorButton = styled.div(() => ({
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

const Menu = styled.div(({ error, disabled, isOpen }) => ({
  position: "absolute",
  width: "100%",
  borderWidth: isOpen ? "1px" : "0",
  borderColor: getBorderColor({
    error,
    isOpen,
    disabled,
    isHovered: false,
  }),
  borderBottomStyle: "solid",
  borderLeftStyle: "solid",
  borderRightStyle: "solid",
  borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
  marginTop: 0,
  boxShadow: theme.boxShadows[0],
  background: disabled ? theme.colors.whiteGrey : theme.colors.white,
  zIndex: 100,
}));

const MenuItem = styled.div(({ isSelected, isActive }) => ({
  color: theme.colors.black,
  padding: subPx(theme.space[2]),
  fontWeight: isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
  background: isActive ? theme.colors.lightBlue : null,
  "&:hover": {
    background: theme.colors.lightBlue,
  },
  "&:last-child": {
    borderRadius: `0 ${theme.radii.medium}`,
  },
}));

const Select = ({
  error, onChange, disabled,
  options, optionToString, value,
  required, placeholder, initialIsOpen,
  id,
}) => (

  <Downshift
    itemToString={ optionToString }
    selectedItem={ value }
    onChange={ onChange }
    defaultHighlightedIndex={ 0 }
    initialIsOpen={ initialIsOpen }
    inputId={ id }
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
              { ...getInputProps({
                disabled, error, isOpen, autoComplete: "off",
              }) }
              aria-required={ required } aria-invalid={ error } placeholder={ placeholder }
              readOnly value={ optionToString(selectedItem) || "" }
            />
            <ToggleButton isOpen={ isOpen } />
          </SelectBox>
          {
            isOpen
              && (
                <Menu { ...getMenuProps({ error, isOpen }) }>
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
  id: PropTypes.string,
};

const extractLabelFromOption = option => option && option.label;

Select.defaultProps = {
  value: undefined,
  required: false,
  onChange: undefined,
  error: false,
  disabled: false,
  initialIsOpen: undefined,
  placeholder: undefined,
  optionToString: extractLabelFromOption,
  id: undefined,
};

export default Select;
