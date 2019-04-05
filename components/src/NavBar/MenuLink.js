import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "../Link/Link";
import theme from "../theme";

const MenuLink = styled(Link).attrs({
  color: "white",
})({
  display: "inline-flex",
  border: "none",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.lightBlue,
    backgroundColor: theme.colors.black,
    cursor: "pointer",
  },
  "&:disabled": {
    opacity: ".5",
  },
});

MenuLink.propTypes = {
  underline: PropTypes.bool,
};

MenuLink.defaultProps = {
  underline: false,
};

export default MenuLink;
