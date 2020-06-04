import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { themeGet } from "@styled-system/theme-get";
import propTypes from "@styled-system/prop-types";
import { darken } from "polished";

const resetButtonStyles = {
  background: "none",
  border: "none"
};

const getHoverColor = props =>
  props.hover
    ? themeGet(`colors.${props.hover}`, props.hover)(props)
    : darken("0.1", themeGet(`colors.${props.color}`, props.color)(props));

const Link = styled.a(color, space, typography, ({ underline, as, ...props }) => ({
  ...resetButtonStyles,
  padding: as === "button" ? "0" : null,
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
  ...propTypes.color,
  ...propTypes.space,
  ...propTypes.typography
};

Link.defaultProps = {
  className: undefined,
  underline: true,
  color: "blue",
  fontSize: "medium"
};

export default Link;
