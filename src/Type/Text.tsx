import styled, { CSSObject } from "styled-components";
import {
  color,
  space,
  typography,
  SpaceProps,
  TypographyProps,
  ColorProps,
  OverflowProps,
  overflow,
  LayoutProps,
  layout,
} from "styled-system";
import { TextOverflowProps, textOverflow } from "../StyledProps/textOverflow";
import { CursorProps, cursor } from "../StyledProps/cursor";
import type { DefaultNDSThemeType } from "../theme.type";
const getAttrs = (inline?: boolean) => (inline ? { as: "span" } : null);

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
} & SpaceProps &
  OverflowProps &
  LayoutProps &
  TextOverflowProps &
  TypographyProps &
  CursorProps &
  ColorProps & { theme?: DefaultNDSThemeType };

const Text = styled.p.attrs<TextProps>((props: TextProps) =>
  getAttrs(props.inline)
)<TextProps>(
  space,
  typography,
  color,
  layout,
  overflow,
  textOverflow,
  cursor,
  ({ disabled, textTransform, theme }: TextProps): CSSObject => ({
    textTransform,
    color: "currentColor",
    marginTop: 0,
    marginBottom: 0,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    opacity: disabled ? "0.7" : undefined,
  })
);
Text.defaultProps = {
  inline: false,
  disabled: false,
};
export default Text;
