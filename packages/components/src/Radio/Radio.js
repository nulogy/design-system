import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { space } from "styled-system";
import styled from "styled-components";
import { Box } from "../Box";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";

const radioStyle = theme => ({
  checked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.lightGrey
    },
    error: {
      borderColor: theme.colors.red,
      backgroundColor: theme.colors.red
    },
    default: {
      borderColor: theme.colors.darkBlue,
      backgroundColor: theme.colors.darkBlue
    }
  },
  unchecked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.whiteGrey
    },
    error: {
      borderColor: theme.colors.red,
      backgroundColor: theme.colors.white
    },
    default: {
      borderColor: theme.colors.grey,
      backgroundColor: theme.colors.white
    }
  }
});

const getRadioStyle = (props, checked) => {
  const radioStyleMap = radioStyle(props.theme);
  if (props.disabled) {
    return radioStyleMap[checked].disabled;
  }
  if (props.error) {
    return radioStyleMap[checked].error;
  }
  return radioStyleMap[checked].default;
};

const VisualRadio = styled.div(({ disabled, theme }) => ({
  minWidth: theme.space.x2,
  height: theme.space.x2,
  marginRight: theme.space.x1,
  borderRadius: theme.radii.circle,
  border: "solid 1px",
  position: "relative",
  top: theme.space.half,
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
    borderRadius: theme.radii.circle
  }
}));

const RadioInput = styled.input(props => ({
  position: "absolute",
  opacity: "0",
  height: "1px",
  width: "1px",
  [`&:focus + ${VisualRadio}`]: {
    boxShadow: props.theme.shadows.focus
  },
  [`&:checked + ${VisualRadio}`]: {
    ...getRadioStyle(props, "checked"),
    "&:before": {
      display: "block"
    }
  },
  [`&:not(:checked) + ${VisualRadio}`]: {
    ...getRadioStyle(props, "unchecked")
  }
}));

const BaseRadio = forwardRef((props, ref) => {
  const { className, labelText, disabled, checked, required, error } = props;
  return (
    <Box className={className}>
      <ClickInputLabel disabled={disabled}>
        <RadioInput
          type="radio"
          ref={ref}
          aria-checked={checked}
          {...props}
          required={required}
          aria-required={required}
          aria-invalid={error}
        />
        <VisualRadio disabled={disabled} checked={checked} />
        <Text inline disabled={disabled}>
          {" "}
          {labelText}{" "}
        </Text>
      </ClickInputLabel>
    </Box>
  );
});

BaseRadio.propTypes = {
  labelText: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool
};

BaseRadio.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  id: null,
  className: undefined,
  required: false
};

const Radio = styled(BaseRadio)(
  ({ theme }) => ({
    padding: `${theme.space.half} 0`
  }),
  space
);

export default Radio;
