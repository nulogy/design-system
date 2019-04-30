import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import styled from "styled-components";
import { transparentize } from "polished";
import { Field } from "../Form";
import { Icon } from "../Icon";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
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
  fontSize: theme.fontSizes.medium,
  padding: subPx(theme.space.x1),
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
  boxShadow: isOpen ? theme.shadows.small : "none",
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
  height: theme.space.x3,
  position: "absolute",
  right: theme.space.half,
  bottom: theme.space.x1,
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
  boxShadow: theme.shadows.small,
  background: disabled ? theme.colors.whiteGrey : theme.colors.white,
  zIndex: 100,
}));

const MenuItem = styled.div(({ isSelected, isActive }) => ({
  color: theme.colors.black,
  padding: subPx(theme.space.x1),
  fontWeight: isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
  background: isActive ? theme.colors.lightBlue : null,
  "&:hover": {
    background: theme.colors.lightBlue,
  },
  "&:last-child": {
    borderRadius: `0 ${theme.radii.medium}`,
  },
}));

const parseValueProp = (value, options) => options.find(o => o.value === value);

const Select = ({
  error, onChange, disabled,
  options, optionToString, value,
  required, placeholder, initialIsOpen,
  id, labelText, helpText, requirementText,
}) => (
  <Field>
    <Downshift
      itemToString={ optionToString }
      selectedItem={ parseValueProp(value, options) }
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
              <MaybeFieldLabel style={ { width: "100%" } } labelText={ labelText } requirementText={ requirementText } helpText={ helpText }>
                <Input
                  { ...getInputProps({
                    disabled, error, isOpen, autoComplete: "off",
                  }) }
                  aria-required={ required } aria-invalid={ error } placeholder={ placeholder }
                  readOnly value={ optionToString(selectedItem) || "" }
                />
              </MaybeFieldLabel>
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
    {error && <InlineValidation mt="x1" message={ error } />}
  </Field>
);

Select.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  optionToString: PropTypes.func,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  initialIsOpen: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string,
};

const extractLabelFromOption = option => option && option.label;

Select.defaultProps = {
  value: undefined,
  required: false,
  onChange: undefined,
  error: null,
  disabled: false,
  initialIsOpen: undefined,
  placeholder: undefined,
  optionToString: extractLabelFromOption,
  id: null,
  labelText: null,
  helpText: null,
  requirementText: null,
};

export default Select;
