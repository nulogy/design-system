import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { SpaceProps } from "styled-system";
import { Box } from "../Box";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import { getSubset, omitSubset } from "../utils/subset";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps } from "../StyledProps";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";

type NativeInputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

type CheckboxProps = NativeInputProps &
  SpaceProps & {
    htmlSize?: number;
    size?: ComponentSize;
    labelText?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    error?: boolean;
    indeterminate?: boolean;
    theme?: DefaultNDSThemeType;
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

type VisualCheckboxProps = React.ComponentProps<"div"> &
  SpaceProps & {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    theme?: DefaultNDSThemeType;
  };

const VisualCheckbox = styled.div<VisualCheckboxProps>(
  ({ indeterminate, theme }): CSSObject => ({
    minWidth: theme.space.x2,
    height: theme.space.x2,
    borderRadius: theme.radii.small,
    border: "solid 1px",
    position: "relative",
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
  }),
  addStyledProps
);

const CheckboxInput = styled.input<CheckboxProps>((props) => ({
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
}));

const Checkbox: React.FC<CheckboxProps> = forwardRef((props, ref) => {
  const { size, className, labelText, disabled, checked, required, error, indeterminate } = props;

  const componentSize = useComponentSize(size);
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);

  return (
    <Box className={className} px="0" {...spaceProps}>
      <ClickInputLabel size={componentSize} disabled={disabled}>
        <CheckboxInput
          type="checkbox"
          required={required}
          aria-required={required}
          aria-invalid={error}
          indeterminate={indeterminate}
          ref={ref}
          {...restProps}
        />
        <VisualCheckbox
          disabled={disabled}
          checked={checked}
          indeterminate={indeterminate}
          data-testid="visual-checkbox"
          marginTop={labelText ? "half" : "0px"}
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
