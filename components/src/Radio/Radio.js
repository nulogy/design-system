import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";
import { subPx } from "../utils"

const getFill = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);

const VisualRadio = styled.div`
  min-width: ${theme.space[3]};
  min-height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 50%;
  box-sizing: border-box;
  border: solid 1px ${props => getFill(props.disabled)};
  background-color: ${theme.colors.white};
  position: relative;
  top: 4px;
  &:before{
    cursor: ${props => (props.disabled ? null : "pointer")};
    content: "";
    display: none;
    position: relative;
    left: 4px;
    top: 4px
    width: 2px;
    height: 2px;
    background-color: white
    border: 2px solid white;
    border-radius: 50%;
  }
`;

const RadioWrapper = styled.label`
  color: ${props => (props.disabled ? theme.colors.grey : "currentColor")};
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: inline-flex;
  width: auto;
  align-items: flex-start;
  user-select: none;
`;

const RadioInput = styled.input`
  cursor: ${props => (props.disabled ? null : "pointer")};
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  &:focus + ${VisualRadio} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
  &:checked + ${VisualRadio} {
    border-color: ${props => getFill(props.disabled)};
    background-color: ${props => getFill(props.disabled)};
    border-width: 1px;
  }
  &:not(:checked) + ${VisualRadio}{
    border-color: ${theme.colors.grey};
  }
  &:checked + ${VisualRadio}:before {
    display: block;
  }
`;

const BaseRadio = props => {
  const {
    className,
    labelText,
    disabled,
    checked,
  } = props;
  return (
    <Box className={ className }>
      <RadioWrapper disabled={ disabled }>
        <RadioInput type="radio" { ...props } />
        <VisualRadio disabled={ disabled } checked={ checked } />
        {labelText}
      </RadioWrapper>
    </Box>
  );
};

BaseRadio.propTypes = {
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

BaseRadio.defaultProps = {
  labelText: null,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  className: null,
};

const Radio = styled(BaseRadio)`
  padding: 8px 0;
`;

export default Radio;
