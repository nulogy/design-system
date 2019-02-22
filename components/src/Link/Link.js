import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, themeGet } from "styled-system";
import { darken } from "polished";
import theme from "../theme";

const getHoverColor = props => (
  props.hover
    ? themeGet(`colors.${props.hover}`, props.hover)(props)
    : darken("0.1", themeGet(`colors.${props.color}`, props.color)(props))
);

const Link = styled.a(
  color,
  space,
  ({ underline, ...props }) => ({
    textDecoration: underline ? "underline" : "none",
    "&:hover": {
      color: getHoverColor(props),
    },
  })
);

Link.propTypes = {
  underline: PropTypes.bool,
  hover: PropTypes.string,
  ...color.propTypes,
};

Link.defaultProps = {
  underline: true,
  color: "blue",
  theme,
};

export default Link;
