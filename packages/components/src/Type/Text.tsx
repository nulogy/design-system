import styled, { CSSObject } from "styled-components";
import { color, space, typography, SpaceProps, TypographyProps, ColorProps } from "styled-system";
import propTypes from "@styled-system/prop-types";
const getAttrs = inline => (inline ? { as: "span" } : null);

export type TextProps = {
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
} & SpaceProps &
  TypographyProps &
  ColorProps &
  React.HTMLAttributes<HTMLParagraphElement>;

const Text = styled.p.attrs((props: TextProps) => getAttrs(props.inline))(
  space,
  typography,
  color,
  ({ disabled, textTransform }: TextProps): CSSObject => ({
    textTransform,
    opacity: disabled ? "0.3333" : undefined
  })
);
Text.defaultProps = {
  inline: false,
  disabled: false,
  mt: 0,
  mb: 0,
  fontSize: "medium",
  lineHeight: "base",
  textTransform: undefined,
  color: "currentColor"
};
export default Text;
