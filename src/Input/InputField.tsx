import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import { transparentize } from "polished";
import { space, variant } from "styled-system";
import { Icon } from "../Icon";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { subPx } from "../utils";
import { MaybeFieldLabel } from "../FieldLabel";
import type { DefaultNDSThemeType } from "../theme.type";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import Prefix from "./Prefix";
import Suffix from "./Suffix";
import icons from "@nulogy/icons";

type NativeInputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

export interface InputFieldProps extends NativeInputProps {
  htmlSize?: number;
  size?: ComponentSize;
  icon?: keyof typeof icons | "loading";
  error?: boolean;
  labelText?: string;
  requirementText?: string;
  helpText?: string;
  suffix?: string;
  prefix?: string;
  suffixWidth?: string;
  prefixWidth?: string;
  suffixAlignment?: "left" | "right";
  prefixAlignment?: "left" | "right";
  iconSize?: string;
  inputWidth?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      icon,
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
      iconSize,
      variant,
      htmlSize,
      ...props
    },
    ref
  ) => {
    const componentVariant = useComponentVariant(variant);

    return (
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
        <Flex alignItems="flex-start">
          <Prefix prefix={prefix} prefixWidth={prefixWidth} textAlign={prefixAlignment} />
          <Box position="relative" display="flex" flexGrow={1} maxWidth={inputWidth}>
            <StyledInput
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
            {icon && <StyledInputIcon icon={icon} size={iconSize || "x2"} variant={componentVariant} />}
          </Box>
          <Suffix suffix={suffix} suffixWidth={suffixWidth} textAlign={suffixAlignment} />
        </Flex>
      </MaybeFieldLabel>
    );
  }
);

type StyledInputProps = Omit<InputFieldProps, "htmlSize" | "size"> & { variant: ComponentVariant };

const StyledInput = styled.input<StyledInputProps>(
  ({ theme, inputWidth }): CSSObject => ({
    display: "block",
    flexGrow: 1,
    border: "1px solid",
    borderRadius: theme.radii.medium,
    fontSize: theme.fontSizes.medium,
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
      " ~ svg": {
        fill: theme.colors.darkBlue,
      },
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black),
    },
    padding: `${subPx(theme.space.x1)}`,
  }),
  ({ theme }) =>
    variant({
      prop: "scale",
      variants: {
        touch: {
          padding: `${subPx(theme.space.x2)}`,
        },
        desktop: {
          padding: `${subPx(theme.space.x1)}`,
        },
      },
    }),
  ({ disabled, error, theme }) => cssForState({ disabled, error, theme }),
  space
);

const StyledInputIcon = styled(Icon)<{ variant: ComponentVariant }>(
  ({ theme }) => ({
    position: "absolute",
    right: theme.space.x1,
    color: theme.colors.darkGrey,
    bottom: "50%",
    transform: "translateY(50%)",
    pointerEvents: "none",
  }),
  variant({
    prop: "scale",
    variants: {
      touch: {
        right: "x2",
      },
      desktop: {
        right: "x1",
      },
    },
  })
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
      color: transparentize(0.33, theme.colors.black),
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
