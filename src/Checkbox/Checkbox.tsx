import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { SpaceProps } from "styled-system";
import { Box } from "../Box";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import { getSubset, omitSubset } from "../utils/subset";
import { DefaultNDSThemeType } from "../theme";
import { addStyledProps } from "../StyledProps";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";

type NativeInputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

type CheckboxProps = NativeInputProps &
  SpaceProps & {
    children?: React.ReactNode;
    htmlSize?: number;
    variant?: ComponentVariant;
    labelText?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    error?: boolean;
    indeterminate?: boolean;
    theme?: DefaultNDSThemeType;
  };

const checkboxStyle = (theme: DefaultNDSThemeType) => ({
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

const getCheckboxStyle = (props: CheckboxProps, checked: "checked" | "unchecked") => {
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

    "&:has(+ p)": {
      marginTop: theme.space.x0_5,
      marginBottom: theme.space.x0_5,
    },

    // checkmark
    "&:before": {
      content: "''",
      display: "none",
      position: "relative",
      left: theme.space.half,
      width: theme.sizes.half,
      height: theme.sizes.x1,
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

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { variant, className, labelText, disabled, checked, required, error, indeterminate } = props;

  const componentVariant = useComponentVariant(variant);
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);

  return (
    <Box className={className} px="0" {...spaceProps}>
      <ClickInputLabel variant={componentVariant} disabled={disabled}>
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
        />
        {labelText && (
          <Text
            fontSize={componentVariant === "touch" ? "md" : undefined}
            lineHeight={componentVariant === "touch" ? "base" : undefined}
            disabled={disabled}
            ml="x1"
          >
            {labelText}
          </Text>
        )}
      </ClickInputLabel>
    </Box>
  );
});

export default Checkbox;
