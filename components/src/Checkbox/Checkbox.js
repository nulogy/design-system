import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Box } from "../Box";
import { Text } from "../Type";
import theme from "../theme";
import { ClickInputLabel } from "../utils";
import { conditionallyRequiredProp } from "../utils/conditionallyRequiredProp";

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
const checkedStyles = {
  borderRadius: "1px",
  borderWidth: "0 3px 3px 0",
  transform: "rotate(45deg)"
};

const indeterminateStyles = {
  borderWidth: "0 3px 0 0",
  transform: "rotate(90deg) translateX(1px)",
  borderRadius: 0
};
const VisualCheckbox = styled.div(({ indeterminate }) => ({
  minWidth: theme.space.x2,
  height: theme.space.x2,
  borderRadius: theme.radii.small,
  border: "solid 1px",
  position: "relative",
  alignSelf: "center",
  // checkmark
  "&:before": {
    content: "''",
    display: "none",
    position: "relative",
    left: "4px",
    width: "3px",
    height: "9px",
    border: `solid ${theme.colors.white}`,
    ...(indeterminate ? indeterminateStyles : checkedStyles)
  }
}));

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
  // disabled react prop types as they are defined in Checkbox
  // eslint-disable-next-line react/prop-types
  const { className, labelText, disabled, checked, required, error, indeterminate } = props;
  return (
    <Box className={className}>
      <ClickInputLabel disabled={disabled}>
        <CheckboxInput type="checkbox" required={required} aria-required={required} aria-invalid={error} {...props} />
        <VisualCheckbox disabled={disabled} checked={checked} indeterminate={indeterminate} />
        {labelText && <Text disabled={disabled}>{labelText}</Text>}
      </ClickInputLabel>
    </Box>
  );
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
  labelText: PropTypes.string,
  checked: conditionallyRequiredProp(PropTypes.bool, "indeterminate"),
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  indeterminate: PropTypes.bool,
  ...propTypes.space
};

Checkbox.defaultProps = {
  labelText: undefined,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  id: null,
  className: undefined,
  required: false,
  indeterminate: undefined
};

export default Checkbox;
