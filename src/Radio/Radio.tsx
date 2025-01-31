import React, { forwardRef, ReactNode } from "react";
import styled, { CSSObject } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { SpaceProps } from "styled-system";
import { Box } from "../Box";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import { DefaultNDSThemeType } from "../theme";
import { getSubset, omitSubset } from "../utils/subset";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { variant } from "../StyledProps";

const radioStyle = (theme: DefaultNDSThemeType) => ({
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

type VisualRadioProps = {
  disabled?: boolean;
  theme?: DefaultNDSThemeType;
};

const VisualRadio = styled.div<VisualRadioProps>(
  ({ disabled, theme }: VisualRadioProps): CSSObject => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: theme.space.x2,
    height: theme.space.x2,
    marginRight: theme.space.x1,
    borderRadius: theme.radii.pill,
    marginTop: theme.space.x0_5,
    border: "solid 1px",
    position: "relative",
    "&:before": {
      cursor: disabled ? undefined : "pointer",
      content: "''",
      display: "none",
      width: `calc(${theme.sizes.x1} - 2px)`,
      height: `calc(${theme.sizes.x1} - 2px)`,
      background: theme.colors.white,
      borderRadius: theme.radii.pill,
    },
  }),
  ({ theme }) =>
    variant({
      variants: {
        touch: {
          "&:before": {
            width: `calc(${theme.sizes.x1} - 3px)`,
            height: `calc(${theme.sizes.x1} - 3px)`,
          },
        },
      },
    })
);

const RadioInput = styled.input<RadioProps>((props) => ({
  position: "absolute",
  opacity: "0",
  height: "1px",
  width: "1px",
  [`&:focus + ${VisualRadio}`]: {
    boxShadow: props.theme.shadows.focus,
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

type NativeInputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

type RadioProps = NativeInputProps &
  SpaceProps & {
    htmlSize?: number;
    variant?: ComponentVariant;
    labelText?: ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    error?: boolean;
  };

type Ref = HTMLInputElement;

const Radio = forwardRef<Ref, RadioProps>(
  ({ disabled = false, error = false, required = false, className, labelText, checked, variant, ...props }, ref) => {
    const componentVariant = useComponentVariant(variant);
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);

    return (
      <Box position="relative" className={className} px="0" {...spaceProps}>
        <ClickInputLabel variant={componentVariant} disabled={disabled}>
          <RadioInput
            type="radio"
            ref={ref}
            aria-checked={checked}
            checked={checked}
            disabled={disabled}
            error={error}
            {...restProps}
            required={required}
            aria-required={required}
            aria-invalid={error}
          />
          <VisualRadio disabled={disabled} />
          <Text
            inline
            disabled={disabled}
            fontSize={componentVariant === "touch" ? "md" : undefined}
            lineHeight={componentVariant === "touch" ? "base" : undefined}
          >
            {" "}
            {labelText}{" "}
          </Text>
        </ClickInputLabel>
      </Box>
    );
  }
);

export default Radio;
