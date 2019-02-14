import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";
import Text from "../Type/Text";

const radioStyle = {
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

const getRadioStyle = (props, checked) => {
  if (props.disabled) { return radioStyle[checked].disabled; }
  if (props.error) { return radioStyle[checked].error; }
  return radioStyle[checked].default;
};

const VisualRadio = styled.div`
  min-width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: ${theme.radii.circle};
  border: solid 1px;
  position: relative;
  top: ${theme.space[1]};
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
    border-radius: ${theme.radii.circle};
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
    ${props => getRadioStyle(props, "checked")}
    border-width: 1px;
  }
  &:not(:checked) + ${VisualRadio} {
    ${props => getRadioStyle(props, "unchecked")}
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
    required,
  } = props;
  return (
    <Box className={ className }>
      <RadioWrapper disabled={ disabled }>
        <RadioInput type="radio" aria-checked={ checked } { ...props }
            required={ required } aria-required={ required }
        />
        <VisualRadio disabled={ disabled } checked={ checked } />
        <Text disabled={ disabled }> {labelText} </Text>
      </RadioWrapper>
    </Box>
  );
};

BaseRadio.propTypes = {
  labelText: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
};

BaseRadio.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  className: null,
  required: false,
};

const Radio = styled(BaseRadio)`
  padding: ${theme.space[2]} 0;
  color: ${props => (props.error ? theme.colors.red : null)};
`;

export default Radio;
