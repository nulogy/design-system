import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, themeGet } from "styled-system";
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
  "&:hover, &:focus": {
    cursor: "pointer",
    color: getHoverColor(props)
  },
  "&:focus": {
    outline: "none",
    boxShadow: theme.shadows.focus
  }
}));

Link.propTypes = {
  underline: PropTypes.bool,
  hover: PropTypes.string,
  ...color.propTypes,
  ...space.propTypes
};

Link.defaultProps = {
  underline: true,
  color: "blue",
  p: 0,
  theme
};

export default Link;
