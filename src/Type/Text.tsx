import styled, { CSSObject } from "styled-components";
import type { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  inline?: boolean;
  disabled?: boolean;
  textTransform?:
    | "none"
    | "inherit"
    | "initial"
    | "-moz-initial"
    | "revert"
    | "unset"
    | "capitalize"
    | "full-size-kana"
    | "full-width"
    | "lowercase"
    | "uppercase"
    | undefined;
  fontSize?: string;
} & StyledProps & { theme?: DefaultNDSThemeType };

const Text = styled.p<TextProps>(
  ({ disabled, textTransform, inline, theme }): CSSObject => ({
    textTransform,
    color: "currentColor",
    marginTop: 0,
    marginBottom: 0,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    opacity: disabled ? "0.7" : undefined,
    display: inline ? "inline" : undefined,
  }),
  addStyledProps
);

Text.defaultProps = {
  inline: false,
  disabled: false,
};
export default Text;
