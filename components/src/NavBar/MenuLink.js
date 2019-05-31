import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";

const MenuLink = styled.a(({ themeColors }) => ({
  display: "block",
  color: (themeColors && themeColors.color) || theme.colors.white,
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
    color: (themeColors && themeColors.hoverColor) || theme.colors.lightBlue,
    backgroundColor: (themeColors && themeColors.hoverBackground) || theme.colors.black,
    cursor: "pointer"
  },
  "&:disabled": {
    opacity: ".5"
  }
}));

MenuLink.propTypes = {
  color: PropTypes.string,
  underline: PropTypes.bool
};

MenuLink.defaultProps = {
  color: theme.colors.white,
  underline: false
};

export default MenuLink;
