import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";
import Text from "../Type/Text";

const uncheckedStyles = {
  disabled: {
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey,
  },
  error: {
    borderColor: theme.colors.red,
  },
  default: {
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.white,
  },
};

const checkedStyles = {
  disabled: {
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.lightGrey,
  },
  error: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.red,
  },
  default: {
    borderColor: theme.colors.darkBlue,
    backgroundColor: theme.colors.darkBlue,
  },
};

const getUncheckedStyle = props => {
  if (props.disabled) { return uncheckedStyles.disabled; }
  if (props.error) { return uncheckedStyles.error; }
  return uncheckedStyles.default;
};

const getCheckedStyle = props => {
  if (props.disabled) { return checkedStyles.disabled; }
  if (props.error) { return checkedStyles.error; }
  return checkedStyles.default;
};

const getCheckedBorderColour = props => getCheckedStyle(props).borderColor;
const getCheckedBackgroundColour = props => getCheckedStyle(props).backgroundColor;
const getUncheckedBorderColour = props => getUncheckedStyle(props).borderColor;
const getUncheckedBackgroundColour = props => getUncheckedStyle(props).backgroundColor;

const VisualCheckbox = styled.div`
  min-width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 2px;
  border: solid 1px ${getUncheckedBorderColour};
  background-color: ${getUncheckedBackgroundColour};
  position: relative;
  top: 4px;
  &:before{
    content: "";
    display: none;
    position: relative;
    left: 4px;
    width: 3px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    border-radius: 1px;
    transform: rotate(45deg);
  }
`;

const CheckboxWrapper = styled.label`
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: inline-flex;
  width: auto;
  vertical-align: top;
  align-items: flex-start;
  user-select: none;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  &:focus + ${VisualCheckbox} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
  &:checked + ${VisualCheckbox} {
    background-color: ${getCheckedBackgroundColour};
    border-color: ${getCheckedBorderColour};
    &:before {
      display: block;
    }
  }
  &:not(:checked) + ${VisualCheckbox} {
    background-color: ${getUncheckedBackgroundColour};
    border-color: ${getUncheckedBorderColour};
  }
`;

const BaseCheckbox = props => {
  const {
    className,
    labelText,
    disabled,
    checked,
    error,
  } = props;
  return (
    <Box className={ className }>
      <CheckboxWrapper disabled={ disabled }>
        <CheckboxInput type="checkbox" { ...props } />
        <VisualCheckbox disabled={ disabled } checked={ checked } />
        <Text disabled={ disabled }> {labelText} </Text>
      </CheckboxWrapper>
    </Box>
  );
};

BaseCheckbox.propTypes = {
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
};

BaseCheckbox.defaultProps = {
  labelText: null,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  className: null,
};

const Checkbox = styled(BaseCheckbox)`
  padding: 8px 0;
  color: ${props => (props.error ? theme.colors.red : null)};
`;

export default Checkbox;
