import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";

const getFill = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);

const VisualRadio = styled.div`
  width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 50%;
  box-sizing: border-box;
  border: solid 1px ${props => getFill(props.disabled)};
  background-color: ${theme.colors.white};
`;

const RadioWrapper = styled.label`
  color: ${props => (props.disabled ? theme.colors.grey : "currentColor")};
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: flex;
  width: auto;
  align-items: center;
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
    border-width: 5px;
  }
  &:not(:checked) + ${VisualRadio}{
    border-color: ${theme.colors.grey};
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
  display: flex;
  height: 40px;
  align-items: center;
`;

export default Radio;
