import styled, { CSSObject } from "styled-components";
import { color, space, typography, SpaceProps, TypographyProps, ColorProps } from "styled-system";
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
  TypographyProps &
  ColorProps;

const Text = styled.p.attrs<TextProps>((props: TextProps) => getAttrs(props.inline))<TextProps>(
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
