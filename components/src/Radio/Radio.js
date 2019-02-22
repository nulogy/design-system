import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Text } from "ComponentsRoot";
import theme from "../theme";
import { InputClickableArea } from "../Utils";

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

const VisualRadio = styled.div(({ disabled }) => ({
  minWidth: theme.space[3],
  height: theme.space[3],
  marginRight: theme.space[2],
  borderRadius: theme.radii.circle,
  border: "solid 1px",
  position: "relative",
  top: theme.space[1],
  "&:before": {
    cursor: disabled ? null : "pointer",
    content: "''",
    display: "none",
    position: "relative",
    left: "4px",
    top: "4px",
    width: "2px",
    height: "2px",
    background: theme.colors.white,
    border: `2px solid ${theme.colors.white}`,
    borderRadius: theme.radii.circle,
  },
}));

const RadioInput = styled.input(props => ({
  position: "absolute",
  opacity: "0",
  height: "1px",
  width: "1px",
  [`&:focus + ${VisualRadio}`]: {
    boxShadow: `0 0 6px ${theme.colors.blue}`,
  },
  [`&:checked + ${VisualRadio}`]: {
    ...getRadioStyle(props, "checked"),
    "&:before": {
      display: "block",
    },
  },
  [`&:not(:checked) + ${VisualRadio}`]: {
    ...getRadioStyle(props, "unchecked"),
  },
}));

const BaseRadio = props => {
  const {
    className,
    labelText,
    disabled,
    checked,
    required,
    error,
  } = props;
  return (
    <Box className={ className }>
      <InputClickableArea disabled={ disabled }>
        <RadioInput
          type="radio" aria-checked={ checked } { ...props }
          required={ required } aria-required={ required }
          aria-invalid={ error }
        />
        <VisualRadio disabled={ disabled } checked={ checked } />
        <Text inline disabled={ disabled }> {labelText} </Text>
      </InputClickableArea>
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

const Radio = styled(BaseRadio)(({ error }) => ({
  padding: `${theme.space[1]} 0`,
  color: error ? theme.colors.red : null,
}));

export default Radio;
