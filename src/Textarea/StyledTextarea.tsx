import React from "react";
import styled, { CSSObject } from "styled-components";
import { transparentize } from "polished";
import { SpaceProps } from "styled-system";
import { space } from "styled-system";
import { subPx } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";

export type StyledTextareaProps = React.ComponentPropsWithRef<"textarea"> &
  SpaceProps & {
    theme?: DefaultNDSThemeType;
    errorMessage?: string;
    errorList?: string[];
    error?: boolean;
    rows?: number;
    isResizeable?: boolean;
  };

const textareaStyles = (theme) => ({
  disabled: {
    color: transparentize(0.33, theme.colors.black),
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

const getTextareaStyle = (props) => {
  const textareaStyleMap = textareaStyles(props.theme);
  if (props.disabled) {
    return textareaStyleMap.disabled;
  }
  if (props.error) {
    return textareaStyleMap.error;
  }
  return textareaStyleMap.default;
};

const StyledTextarea: React.FC<StyledTextareaProps> = styled.textarea(
  space,
  ({ theme, isResizeable }: any): CSSObject => ({
    display: "block",
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    minHeight: theme.space.x5,
    minWidth: "20em",
    resize: isResizeable ? null : "none",
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black),
    },
  }),
  (props) => getTextareaStyle(props)
);

export default StyledTextarea;
