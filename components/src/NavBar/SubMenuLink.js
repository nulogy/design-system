import styled from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "styled-system";
import { Link } from "../Link";
import theme from "../theme";

const SubMenuLink = styled(Link)(props => ({
  display: "block",
  borderColor: "transparent",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: themeGet(`colors.${props.bgHoverColor}`, props.bgHoverColor)(props)
  },
  "&:disabled": {
    opacity: ".5"
  }
}));

SubMenuLink.propTypes = {
  color: PropTypes.string,
  hover: PropTypes.string,
  bgHoverColor: PropTypes.string,
  underline: PropTypes.bool
};

SubMenuLink.defaultProps = {
  color: theme.colors.darkBlue,
  hover: theme.colors.darkBlue,
  bgHoverColor: theme.colors.lightGrey,
  underline: false
};

export default SubMenuLink;
