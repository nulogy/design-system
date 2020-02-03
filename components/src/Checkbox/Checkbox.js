import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Box } from "../Box";
import { Text } from "../Type";
import theme from "../theme";
import { ClickInputLabel } from "../utils";

const checkboxStyle = {
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
};

const getCheckboxStyle = (props, checked) => {
  if (props.disabled) {
    return checkboxStyle[checked].disabled;
  }
  if (props.error) {
    return checkboxStyle[checked].error;
  }
  return checkboxStyle[checked].default;
};

const VisualCheckbox = styled.div({
  minWidth: theme.space.x2,
  height: theme.space.x2,
  borderRadius: theme.radii.small,
  border: "solid 1px",
  position: "relative",
  alignSelf: "center",
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
    transform: "rotate(45deg)"
  }
});

const CheckboxInput = styled.input(props => ({
  position: "absolute",
  opacity: "0",
  height: "1px",
  width: "1px",
  [`&:focus + ${VisualCheckbox}`]: {
    boxShadow: theme.shadows.focus
  },
  [`&:checked + ${VisualCheckbox}`]: {
    ...getCheckboxStyle(props, "checked"),
    "&:before": {
      display: "block"
    }
  },
  [`&:not(:checked) + ${VisualCheckbox}`]: {
    ...getCheckboxStyle(props, "unchecked")
  }
}));

const BaseCheckbox = props => {
  const { className, labelText, disabled, checked, required, error } = props;
  return (
    <Box className={className}>
      <ClickInputLabel disabled={disabled}>
        <CheckboxInput type="checkbox" required={required} aria-required={required} aria-invalid={error} {...props} />
        <VisualCheckbox disabled={disabled} checked={checked} />
        {labelText && <Text disabled={disabled}>{labelText}</Text>}
      </ClickInputLabel>
    </Box>
  );
};

BaseCheckbox.propTypes = {
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool
};

BaseCheckbox.defaultProps = {
  labelText: undefined,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  id: null,
  className: undefined,
  required: false
};

const Checkbox = styled(BaseCheckbox)(
  {
    padding: `${theme.space.half} 0`
  },
  {
    [`& ${Text}`]: {
      marginLeft: theme.space.x1
    }
  },
  space
);

Checkbox.propTypes = {
  ...propTypes.space
};

export default Checkbox;
