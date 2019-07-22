import styled, { DefaultTheme } from "styled-components";
import { color, space, themeGet, ColorProps, SpaceProps } from "styled-system";
import { darken } from "polished";
import theme from "../theme";

const resetButtonStyles = {
  background: "none",
  border: "none",
  fontSize: theme.fontSizes.medium
};

const getHoverColor = ({ hover, color }: Pick<LinkProps, "color" | "hover">, theme: DefaultTheme) =>
  hover ? themeGet(`colors.${hover}`, hover)({ theme }) : darken("0.1", themeGet(`colors.${color}`, color)({ theme }));

const Link = styled.a<LinkProps>(color, space, ({ underline, color, hover, theme }) => ({
  ...resetButtonStyles,
  textDecoration: underline ? "underline" : "none",
  "&:hover": {
    cursor: "pointer",
    color: getHoverColor({ hover, color }, theme)
  },
  "&:focus": {
    outline: "none",
    boxShadow: theme.shadows.focus
  }
}));

interface LinkProps extends ColorProps, SpaceProps {
  underline?: boolean;
  hover?: string;
}

Link.defaultProps = {
  underline: true,
  color: "blue",
  p: 0,
  theme
};

export default Link;
