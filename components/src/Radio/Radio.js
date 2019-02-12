import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";
import Text from "../Type/Text";

const getUncheckedBackgroundColour = disabled => (disabled ? theme.colors.whiteGrey : theme.colors.white);
const getCheckedBackgroundColour = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);
const getUncheckedBorderColour = disabled => (disabled ? theme.colors.lightGrey : theme.colors.grey);
const getCheckedBorderColour = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);

const VisualRadio = styled.div`
  min-width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 50%;
  border: solid 1px ${props => getUncheckedBorderColour(props.disabled)};
  background-color: ${props => getUncheckedBackgroundColour(props.disabled)};
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
    background: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
    border-radius: 50%;
  }
`;

const RadioWrapper = styled.label`
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: inline-flex;
  width: auto;
  vertical-align: top;
  align-items: flex-start;
  user-select: none;
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  &:focus + ${VisualRadio} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
  &:checked + ${VisualRadio} {
    border-color: ${props => getCheckedBorderColour(props.disabled)};
    background-color: ${props => getCheckedBackgroundColour(props.disabled)};
    border-width: 1px;
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
        <Text mb={ 0 } disabled={ disabled }> {labelText} </Text>
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
