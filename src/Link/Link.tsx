import styled, { CSSObject } from "styled-components";
import {
  color,
  space,
  typography,
  ColorProps,
  SpaceProps,
  LayoutProps,
  TypographyProps,
} from "styled-system";
import { darken } from "polished";
import { themeGet } from "@styled-system/theme-get";
import { DefaultNDSThemeType } from "../theme.type";

export type LinkProps = React.ComponentPropsWithRef<"a"> &
  ColorProps &
  SpaceProps &
  LayoutProps &
  TypographyProps & {
    className?: string;
    underline?: boolean;
    hover?: string;
    as?: React.ElementType | string;
    to?: string;
    color?: string;
    fontSize?: string;
    theme?: DefaultNDSThemeType;
    children: JSX.Element | JSX.Element[] | React.ReactNode;
    "aria-label"?: string;
  };

const resetButtonStyles = {
  background: "none",
  border: "none",
};

const getHoverColor = (props: LinkProps) =>
  props.hover
    ? props.color
    : darken("0.1", themeGet(`colors.${props.color}`, props.color)(props));

const Link = styled.a.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["underline", "hover"].includes(prop) && defaultValidatorFn(prop),
})<LinkProps>(
  color,
  space,
  typography,
  ({ underline, as, ...props }: LinkProps): CSSObject => ({
    ...resetButtonStyles,
    padding: as === "button" ? "0" : undefined,
    textDecoration: underline ? "underline" : "none",
    "&:hover": {
      cursor: "pointer",
      color: getHoverColor(props),
    },
  })
);

Link.defaultProps = {
  className: undefined,
  underline: true,
  fontSize: "medium",
  color: "blue",
};

export default Link;
