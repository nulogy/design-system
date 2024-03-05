import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import { transparentize } from "polished";
import { space, variant } from "styled-system";
import { Icon } from "../Icon";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { subPx } from "../utils";
import { MaybeFieldLabel } from "../FieldLabel";
import { DefaultNDSThemeType } from "../theme.type";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import Prefix from "./Prefix";
import Suffix from "./Suffix";

type NativeInputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

export type InputFieldProps = NativeInputProps & {
  htmlSize?: number;
  size?: ComponentSize;
  icon?: string;
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
};

export const InputField: React.FC<InputFieldProps> = forwardRef<HTMLInputElement, InputFieldProps>(
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
      size,
      htmlSize,
      ...props
    },
    ref
  ) => {
    const componentSize = useComponentSize(size);

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
              scale={componentSize}
              inputWidth={inputWidth}
              {...props}
            />
            {icon && <StyledInputIcon icon={icon} size={iconSize || "x2"} scale={componentSize} />}
          </Box>
          <Suffix suffix={suffix} suffixWidth={suffixWidth} textAlign={suffixAlignment} />
        </Flex>
      </MaybeFieldLabel>
    );
  }
);

type StyledInputProps = Omit<InputFieldProps, "htmlSize" | "size"> & { scale: ComponentSize };

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
        large: {
          padding: `${subPx(theme.space.x2)}`,
        },
        medium: {
          padding: `${subPx(theme.space.x1)}`,
        },
      },
    }),
  ({ disabled, error, theme }) => cssForState({ disabled, error, theme }),
  space
);

const StyledInputIcon = styled(Icon)<{ scale: ComponentSize }>(
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
      large: {
        right: "x2",
      },
      medium: {
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
