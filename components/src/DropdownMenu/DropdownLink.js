import styled from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "@styled-system/theme-get";
import theme from "../theme";

const DropdownLink = styled.a(props => ({
  display: "block",
  textDecoration: "none",
  color: themeGet(`colors.${props.color}`, props.color)(props),
  borderColor: "transparent",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  fontSize: theme.fontSizes.medium,
  transition: ".2s",
  padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
  borderLeft: `${theme.space.half} solid transparent`,
  "&:hover": {
    color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props),
    backgroundColor: themeGet(`colors.${props.bgHoverColor}`, props.bgHoverColor)(props)
  },
  "&:focus": {
    outline: "none",
    color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props),
    backgroundColor: themeGet(`colors.${props.bgHoverColor}`, props.bgHoverColor)(props),
    borderLeft: `${theme.space.half}  solid ${theme.colors.blue}`
  },
  "&:disabled": {
    opacity: ".5"
  }
}));

DropdownLink.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  bgHoverColor: PropTypes.string
};

DropdownLink.defaultProps = {
  color: "darkBlue",
  hoverColor: "darkBlue",
  bgHoverColor: "lightGrey"
};

export default DropdownLink;
