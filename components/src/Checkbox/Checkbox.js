import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
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
  const { className, labelClassName, inputClassName, labelText, disabled, checked, required, error } = props;
  return (
    <Box className={className}>
      <ClickInputLabel className={labelClassName} disabled={disabled}>
        <CheckboxInput
          className={inputClassName}
          type="checkbox"
          required={required}
          aria-required={required}
          aria-invalid={error}
          {...props}
        />
        <VisualCheckbox disabled={disabled} checked={checked} />
        <Text disabled={disabled}> {labelText} </Text>
      </ClickInputLabel>
    </Box>
  );
};

BaseCheckbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  required: PropTypes.bool
};

BaseCheckbox.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  id: null,
  classname: undefined,
  labelclassname: undefined,
  inputclassname: undefined,
  required: false
};

const Checkbox = styled(BaseCheckbox)(
  {
    padding: `${theme.space.half} 0`
  },
  space
);

export default Checkbox;
