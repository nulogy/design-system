import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space } from "styled-system";
import { themeGet } from "@styled-system/theme-get";
import { darken } from "polished";
import theme from "../theme";

const resetButtonStyles = {
  background: "none",
  border: "none",
  fontSize: theme.fontSizes.medium
};

const getHoverColor = props =>
  props.hover
    ? themeGet(`colors.${props.hover}`, props.hover)(props)
    : darken("0.1", themeGet(`colors.${props.color}`, props.color)(props));

const Link = styled.a(color, space, ({ underline, ...props }) => ({
  ...resetButtonStyles,
  textDecoration: underline ? "underline" : "none",
  "&:hover": {
    cursor: "pointer",
    color: getHoverColor(props)
  }
}));

Link.propTypes = {
  className: PropTypes.string,
  underline: PropTypes.bool,
  hover: PropTypes.string,
  ...color.propTypes,
  ...space.propTypes
};

Link.defaultProps = {
  className: undefined,
  underline: true,
  color: "blue",
  p: 0,
  theme
};

export default Link;
