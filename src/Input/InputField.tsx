import React, { forwardRef } from "react";
import styled, { CSSObject, useTheme } from "styled-components";
import { position, PositionProps, space, SpaceProps, variant } from "styled-system";
import { Icon } from "../Icon";
import { Box, BoxProps } from "../Box";
import { Flex } from "../Flex";
import { subPx } from "../utils";
import { MaybeFieldLabel } from "../FieldLabel";
import type { DefaultNDSThemeType } from "../theme";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import Prefix from "./Prefix";
import Suffix from "./Suffix";

type NativeInputProps = Omit<React.ComponentPropsWithRef<"input">, "size" | "height" | "width">;

export interface InputFieldProps extends NativeInputProps {
  htmlSize?: number;
  variant?: ComponentVariant;
  iconRight?: string;
  iconLeft?: string;
  iconRightSize?: string;
  iconLeftSize?: string;
  error?: boolean;
  labelText?: string;
  requirementText?: string;
  helpText?: React.ReactNode;
  suffix?: string;
  prefix?: string;
  suffixWidth?: string;
  prefixWidth?: string;
  suffixAlignment?: "left" | "right";
  prefixAlignment?: "left" | "right";
  inputWidth?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      iconRight,
      iconLeft,
      iconRightSize = "x3",
      iconLeftSize = "x3",
      error,
      required,
      labelText,
      requirementText,
      helpText,
      prefix,
      prefixWidth,
      prefixAlignment,
      suffix,
      suffixAlignment,
      suffixWidth,
      inputWidth,
      variant,
      htmlSize,
      ...props
    },
    ref
  ) => {
    const componentVariant = useComponentVariant(variant);
    const theme = useTheme();

    return (
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
        <Flex alignItems="flex-start">
          <Prefix prefix={prefix} prefixWidth={prefixWidth} textAlign={prefixAlignment} />
          <InputWrapper maxWidth={inputWidth}>
            {iconLeft && <StyledInputIcon left="x1" icon={iconLeft} size={iconLeftSize} variant={variant} />}
            <StyledInput
              paddingLeft={iconLeft ? `calc(${theme.space[iconLeftSize]} + ${theme.space.x1_5})` : theme.space.x1}
              paddingRight={iconRight ? `calc(${theme.space[iconRightSize]} + ${theme.space.x1_5})` : theme.space.x1}
              aria-invalid={error}
              aria-required={required}
              required={required}
              error={error}
              ref={ref}
              size={htmlSize}
              variant={componentVariant}
              inputWidth={inputWidth}
              {...props}
            />
            {iconRight && <StyledInputIcon right="x1" icon={iconRight} size={iconRightSize} variant={variant} />}
          </InputWrapper>
          <Suffix suffix={suffix} suffixWidth={suffixWidth} textAlign={suffixAlignment} />
        </Flex>
      </MaybeFieldLabel>
    );
  }
);

const InputWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexGrow: 1,

  ":focus-within": {
    svg: {
      color: theme.colors.darkBlue,
    },
  },
}));

type StyledInputProps = Omit<InputFieldProps, "htmlSize" | "size"> & { variant: ComponentVariant } & SpaceProps;

const StyledInput = styled.input<StyledInputProps>(
  ({ theme, inputWidth }): CSSObject => ({
    display: "block",
    flexGrow: 1,
    border: "1px solid",
    borderRadius: theme.radii.medium,
    fontSize: theme.fontSizes.base,
    lineHeight: theme.lineHeights.base,
    margin: theme.space.none,
    minHeight: theme.space.x5,
    maxWidth: inputWidth,
    width: inputWidth,
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
      "& svg": {
        color: theme.colors.darkBlue,
      },
    },
    "::placeholder": {
      color: theme.colors.midGrey,
    },
    paddingTop: `${subPx(theme.space.x1)}`,
    paddingBottom: `${subPx(theme.space.x1)}`,
  }),
  variant({
    variants: {
      touch: {
        fontSize: "md",
        lineHeight: "base",
      },
    },
  }),
  ({ disabled, error, theme }) => cssForState({ disabled, error, theme }),
  space
);

const StyledInputIcon = styled(Icon)<{ variant: ComponentVariant } & PositionProps>(
  ({ theme }) => ({
    position: "absolute",
    color: theme.colors.midGrey,
    bottom: "50%",
    transform: "translateY(50%)",
    pointerEvents: "none",
  }),
  position
);

const cssForState = ({
  disabled,
  error,
  theme,
}: {
  disabled: InputFieldProps["disabled"];
  error: InputFieldProps["error"];
  theme: DefaultNDSThemeType;
}) => {
  if (disabled)
    return {
      color: theme.colors.midGrey,
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.whiteGrey,
    };

  if (error)
    return {
      color: theme.colors.red,
      borderColor: theme.colors.red,
    };

  return {
    color: theme.colors.black,
    borderColor: theme.colors.grey,
  };
};

export const InputFieldDefaultProps: InputFieldProps = {
  disabled: false,
  required: false,
  error: false,
  suffixAlignment: "left",
  prefixAlignment: "left",
} as const;
