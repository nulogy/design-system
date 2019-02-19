import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";
import Text from "../Type/Text";

const checkboxStyle = {
  checked: {
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
  },
  unchecked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.whiteGrey,
    },
    error: {
      borderColor: theme.colors.red,
      backgroundColor: theme.colors.white,
    },
    default: {
      borderColor: theme.colors.grey,
      backgroundColor: theme.colors.white,
    },
  },
};

const getCheckboxStyle = (props, checked) => {
  if (props.disabled) { return checkboxStyle[checked].disabled; }
  if (props.error) { return checkboxStyle[checked].error; }
  return checkboxStyle[checked].default;
};

const VisualCheckbox = styled.div`
  min-width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: ${theme.radii.small};
  border: solid 1px;
  position: relative;
  top: ${theme.space[1]};
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
  display: inline-flex;
  align-items: flex-start;
  vertical-align: top;
  width: auto;
  cursor: ${props => (props.disabled ? null : "pointer")};
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
    ${props => getCheckboxStyle(props, "checked")}
    &:before {
      display: block;
    }
  }
  &:not(:checked) + ${VisualCheckbox} {
    ${props => getCheckboxStyle(props, "unchecked")}
  }
`;

const BaseCheckbox = props => {
  const {
    className,
    labelText,
    disabled,
    checked,
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
  padding: ${theme.space[2]} 0;
  color: ${props => (props.error ? theme.colors.red : null)};
`;

export default Checkbox;
