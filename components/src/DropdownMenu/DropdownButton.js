import styled from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "@styled-system/theme-get";
import theme from "../theme";

const DropdownButton = styled.button(props => ({
  display: "block",
  width: "100%",
  cursor: props.disabled ? "default" : "pointer",
  color: themeGet(`colors.${props.color}`, props.color)(props),
  border: "none",
  textAlign: "left",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  fontSize: theme.fontSizes.medium,
  transition: ".2s",
  padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
  borderLeft: `${theme.space.half} solid transparent`,
  "&:hover": {
    color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props),
    backgroundColor: props.disabled
      ? "transparent"
      : themeGet(`colors.${props.bgHoverColor}`, props.bgHoverColor)(props)
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

DropdownButton.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  hoverColor: PropTypes.string,
  bgHoverColor: PropTypes.string
};

DropdownButton.defaultProps = {
  color: theme.colors.darkBlue,
  disabled: false,
  hoverColor: theme.colors.darkBlue,
  bgHoverColor: theme.colors.lightGrey
};

export default DropdownButton;
