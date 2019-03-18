import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Text } from "ComponentsRoot";
import theme from "../theme";
import { InputClickableArea } from "../Utils";

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

const VisualCheckbox = styled.div({
  minWidth: theme.space.x2,
  height: theme.space.x2,
  marginRight: theme.space.x1,
  borderRadius: theme.radii.small,
  border: "solid 1px",
  position: "relative",
  top: theme.space.half,
  "&:before": {
    content: "''",
    display: "none",
    position: "relative",
    left: "4px",
    width: "3px",
    height: "9px",
    border: `solid ${theme.colors.white}`,
    borderWidth: "0 3px 3px 0",
    borderRadius: "1px",
    transform: "rotate(45deg)",
  },
});

const CheckboxInput = styled.input(props => ({
  position: "absolute",
  opacity: "0",
  height: "1px",
  width: "1px",
  [`&:focus + ${VisualCheckbox}`]: {
    boxShadow: `0 0 6px ${theme.colors.blue}`,
  },
  [`&:checked + ${VisualCheckbox}`]: {
    ...getCheckboxStyle(props, "checked"),
    "&:before": {
      display: "block",
    },
  },
  [`&:not(:checked) + ${VisualCheckbox}`]: {
    ...getCheckboxStyle(props, "unchecked"),
  },
}));

const BaseCheckbox = props => {
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
        <CheckboxInput
          type="checkbox" required={ required } aria-required={ required }
          aria-invalid={ error }
          { ...props }
        />
        <VisualCheckbox disabled={ disabled } checked={ checked } />
        <Text disabled={ disabled }> {labelText} </Text>
      </InputClickableArea>
    </Box>
  );
};

BaseCheckbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
};

BaseCheckbox.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  className: null,
  required: false,
};

const Checkbox = styled(BaseCheckbox)(({ error }) => ({
  padding: `${theme.space.half} 0`,
  color: error ? theme.colors.red : null,
}));

export default Checkbox;
