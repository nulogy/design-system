import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Text from "../Type/Text";
import Flex from "../Flex/Flex";
import Label from "../Field/Label";
import Input from "../Input/Input";

const checkboxStyle = {
  disabled: {
    borderColor: theme.colors.lightGrey,
    color: theme.colors.grey,
  },
  checked: {
    borderColor: theme.colors.darkBlue,
    borderWidth: '5px',
  },
  default: {
    borderColor: theme.colors.grey,
    borderWidth: '1px',
  },
};

const getCheckboxStyle = props => {
  if (props.disabled) { return checkboxStyle.disabled; }
  if (props.checked) { return checkboxStyle.checked; }
  return checkboxStyle.default;
};

const getBorderColor = props => getCheckboxStyle(props).borderColor;
const getBorderWidth = props => getCheckboxStyle(props).borderWidth;
const getColor = props => getCheckboxStyle(props).color;

const CheckboxInput = styled(Input)`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  order: 1;
`;

const VisualCheckbox = styled.div`
  order: -1;
  width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 50%;
  box-sizing: border-box;
`;


const BaseCheckbox = ({
  label,
  disabled,
  checked,
  ...props
}) => (
  <Label mb={theme.space[0]} {...props} >{label}
    <CheckboxInput type="checkbox" />
    <VisualCheckbox />
  </Label>
);


const Checkbox = styled(BaseCheckbox)`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: ${getColor};
  ${CheckboxInput} {
    &:checked ~ ${VisualCheckbox} {
      border-color: ${getBorderColor};
      border-width: ${getBorderWidth};
    }
  }
  ${VisualCheckbox} {
    border: solid 1px ${getBorderColor};
    border-width: ${getBorderWidth};
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
};

export default Checkbox;
