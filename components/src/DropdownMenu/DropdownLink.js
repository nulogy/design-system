import styled from "styled-components";
import PropTypes from "prop-types";
import { fontSize, themeGet } from "styled-system";
import theme from "../theme";

const DropdownLink = styled.a(fontSize, props => ({
  display: "block",
  textDecoration: "none",
  color: themeGet(`colors.${props.color}`, props.color)(props),
  borderColor: "transparent",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  padding: `${theme.space.half} ${theme.space.x2}`,
  "&:hover": {
    color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props),
    backgroundColor: themeGet(`colors.${props.bgHoverColor}`, props.bgHoverColor)(props)
  },
  "&:focus": {
    outline: "none",
    boxShadow: theme.shadows.focus
  },
  "&:disabled": {
    opacity: ".5"
  }
}));

DropdownLink.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  fontSize: PropTypes.string
};

DropdownLink.defaultProps = {
  color: "darkBlue",
  hoverColor: "darkBlue",
  bgHoverColor: "lightGrey",
  fontSize: "medium"
};

export default DropdownLink;
