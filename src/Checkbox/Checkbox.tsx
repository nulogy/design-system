import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { Box } from "../Box";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import { getSubset, omitSubset } from "../utils/subset";
import { DefaultNDSThemeType } from "../theme.type";

type CheckboxProps = React.ComponentPropsWithRef<"input"> & {
  labelText?: string;
  checked?: any;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  className?: string;
  required?: boolean;
  indeterminate?: boolean;
  theme?: DefaultNDSThemeType;
  ref?: unknown;
};

const checkboxStyle = (theme) => ({
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
});
const getCheckboxStyle = (props, checked) => {
  const checkboxStyleMap = checkboxStyle(props.theme);
  if (props.disabled) {
    return checkboxStyleMap[checked].disabled;
  }
  if (props.error) {
    return checkboxStyleMap[checked].error;
  }
  return checkboxStyleMap[checked].default;
};
const checkedStyles = {
  borderRadius: "1px",
  borderWidth: "0 3px 3px 0",
  transform: "rotate(45deg)",
};
const indeterminateStyles = {
  borderWidth: "0 3px 0 0",
  transform: "rotate(90deg) translateX(1px)",
  borderRadius: 0,
};

const VisualCheckbox: React.FunctionComponent<any> = styled.div(
  ({ indeterminate, theme }: any): CSSObject => ({
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
      ...(indeterminate ? indeterminateStyles : checkedStyles),
    },
  })
);
const CheckboxInput: React.FunctionComponent<CheckboxProps> = styled.input(
  (props) => ({
    position: "absolute",
    opacity: "0",
    height: "1px",
    width: "1px",
    [`&:focus + ${VisualCheckbox}`]: {
      boxShadow: props.theme.shadows.focus,
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
  })
);
const Checkbox: React.SFC<any> = forwardRef((props, ref) => {
  const {
    className,
    labelText,
    disabled,
    checked,
    required,
    error,
    indeterminate,
  } = props;
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);
  return (
    <Box className={className} py="half" px="0" {...spaceProps}>
      <ClickInputLabel disabled={disabled}>
        <CheckboxInput
          type="checkbox"
          required={required}
          aria-required={required}
          aria-invalid={error}
          indeterminate={indeterminate}
          ref={ref as any}
          {...restProps}
        />
        <VisualCheckbox
          disabled={disabled}
          checked={checked}
          indeterminate={indeterminate}
          data-testid="visual-checkbox"
        />
        {labelText && (
          <Text disabled={disabled} ml="x1">
            {labelText}
          </Text>
        )}
      </ClickInputLabel>
    </Box>
  );
});

Checkbox.defaultProps = {
  labelText: undefined,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  id: undefined,
  className: undefined,
  required: false,
  indeterminate: undefined,
};

export default Checkbox;
