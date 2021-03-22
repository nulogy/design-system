import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import { transparentize } from "polished";
import { space, TextAlignProps } from "styled-system";
import { Icon } from "../Icon";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { subPx } from "../utils";
import { MaybeFieldLabel } from "../FieldLabel";
import Prefix from "./Prefix";
import Suffix from "./Suffix";
import { DefaultNDSThemeType } from "../theme.type";

const StyledInputIcon = styled(Icon)(({ theme }) => ({
  position: "absolute",
  right: theme.space.x1,
  color: theme.colors.darkGrey,
  bottom: "50%",
  transform: "translateY(50%)",
  pointerEvents: "none",
}));

const inputStyles = (theme) => ({
  disabled: {
    color: transparentize(0.6667, theme.colors.black),
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey,
  },
  error: {
    color: theme.colors.red,
    borderColor: theme.colors.red,
  },
  default: {
    color: theme.colors.black,
    borderColor: theme.colors.grey,
  },
});

type StyledInputProps = React.ComponentPropsWithRef<"input"> & {
  theme?: DefaultNDSThemeType;
  disabled?: boolean;
  error?: boolean;
  inputWidth?: string;
  required?: boolean;
};

const getInputStyle = ({ disabled, error, theme }: StyledInputProps) => {
  if (disabled) {
    return inputStyles(theme).disabled;
  }
  if (error) {
    return inputStyles(theme).error;
  }
  return inputStyles(theme).default;
};

const StyledInput: React.SFC<StyledInputProps> = styled.input(
  ({ theme, inputWidth }: any): CSSObject => ({
    display: "block",
    flexGrow: 1,
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
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
  }),
  space,
  (props: StyledInputProps) => getInputStyle(props)
);

export type InputFieldProps = React.ComponentPropsWithRef<"input"> & {
  icon?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  labelText?: string;
  requirementText?: string;
  helpText?: React.ReactNode;
  suffix?: string;
  prefix?: string;
  suffixWidth?: string;
  prefixWidth?: string;
  suffixAlignment?: TextAlignProps["textAlign"];
  prefixAlignment?: TextAlignProps["textAlign"];
  iconSize?: string;
  inputWidth?: string;
};
export const InputField: React.SFC<InputFieldProps> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(
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
      ...props
    },
    ref
  ) => (
    <MaybeFieldLabel
      labelText={labelText}
      requirementText={requirementText}
      helpText={helpText}
    >
      <Flex alignItems="flex-start">
        <Prefix
          prefix={prefix}
          prefixWidth={prefixWidth}
          textAlign={prefixAlignment}
        />
        <Box position="relative" display="flex" flexGrow={1} maxWidth={inputWidth}>
          <StyledInput
            aria-invalid={error}
            aria-required={required}
            required={required}
            error={error}
            ref={ref}
            inputWidth={inputWidth}
            {...props}
          />
          {icon && (
            <StyledInputIcon icon={icon} size={iconSize || "x2"} />
          )}
        </Box>
        <Suffix
          suffix={suffix}
          suffixWidth={suffixWidth}
          textAlign={suffixAlignment}
        />
      </Flex>
    </MaybeFieldLabel>
  )
);
