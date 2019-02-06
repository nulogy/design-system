import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";

const getFill = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);

const VisualCheckbox = styled.div`
  min-width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 2px;
  border: solid 1px ${props => getFill(props.disabled)};
  background-color: ${theme.colors.white};
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
  color: ${props => (props.disabled ? theme.colors.grey : "currentColor")};
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: inline-flex;
  width: auto;
  align-items: center;
  user-select: none;
`;

const CheckboxInput = styled.input`
  cursor: ${props => (props.disabled ? null : "pointer")};
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  &:focus + ${VisualCheckbox} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
  &:checked + ${VisualCheckbox} {
    background-color: ${props => getFill(props.disabled)};
  }
  &:not(:checked) + ${VisualCheckbox}{
    border-color: ${theme.colors.grey};
  }
  &:checked + ${VisualCheckbox}:before {
    display: block;
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
    <Box className={className}>
      <CheckboxWrapper disabled={ disabled }>
        <CheckboxInput type="checkbox" { ...props } />
        <VisualCheckbox disabled={ disabled } checked={ checked } />
        {labelText}
      </CheckboxWrapper>
    </Box>
  );
};

BaseCheckbox.propTypes = {
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

BaseCheckbox.defaultProps = {
  labelText: null,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
};

const Checkbox = styled(BaseCheckbox)`
  padding: 8px 0;
`;

export default Checkbox;
