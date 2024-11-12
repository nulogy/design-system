import styled from "styled-components";
import { Link } from "../Link";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { addStyledProps, StyledProps } from "../StyledProps";

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: ComponentVariant;
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
} & StyledProps;

const Text = styled.p<TextProps>(
  ({ disabled = false, textTransform, inline = false, theme }) => ({
    textTransform,
    color: "currentColor",
    marginTop: 0,
    marginBottom: 0,
    fontSize: theme.fontSizes.base,
    lineHeight: theme.lineHeights.base,
    opacity: disabled ? "0.7" : undefined,
    display: inline ? "inline" : undefined,

    [`${Link}`]: {
      fontSize: "inherit",
      lineHeight: "inherit",
    },
  }),
  addStyledProps
);

export default Text;
