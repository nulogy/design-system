import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "../Link";
import theme from "../theme";

const MenuLink = styled(Link)({
  display: "block",
  border: "none",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.black
  },
  "&:disabled": {
    opacity: ".5"
  }
});

MenuLink.propTypes = {
  color: PropTypes.string,
  underline: PropTypes.bool
};

MenuLink.defaultProps = {
  color: theme.colors.white,
  underline: false
};

export default MenuLink;
