import styled from "styled-components";
import { themeGet } from "styled-system";
import PropTypes from "prop-types";
import theme from "../theme";

const MenuLink = styled.a(({ color, hoverColor, hoverBackground }) => ({
  display: "block",
  color: themeGet(`colors.${color}`, color)(color),
  textDecoration: "none",
  border: "none",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
    backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(hoverBackground),
    cursor: "pointer"
  },
  "&:focus": {
    boxShadow: theme.shadows.focus
  },
  "&:disabled": {
    opacity: ".5"
  }
}));

MenuLink.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

MenuLink.defaultProps = {
  color: theme.colors.white,
  hoverColor: theme.colors.lightBlue,
  hoverBackground: theme.colors.black
};

export default MenuLink;
