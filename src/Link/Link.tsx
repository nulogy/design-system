import styled, { CSSObject } from "styled-components";
import {
  color,
  space,
  typography,
  ColorProps,
  SpaceProps,
  LayoutProps,
} from "styled-system";
import { darken } from "polished";
import { DefaultNDSThemeType } from "../theme.type";
import { themeGet } from "@styled-system/theme-get";

const resetButtonStyles = {
  background: "none",
  border: "none",
};

type LinkProps = ColorProps &
  SpaceProps &
  LayoutProps & {
    className?: string;
    underline?: boolean;
    hover?: string;
    as?: React.ElementType;
    color?: string;
    fontSize?: string;
    theme?: DefaultNDSThemeType;
    "aria-label"?: string;
  };

const getHoverColor = (props: LinkProps) =>
  props.hover
    ? props.color
    : darken("0.1", themeGet(`colors.${props.color}`, props.color)(props));

const Link = styled.a<LinkProps>(
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
