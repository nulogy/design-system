import styled from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "styled-system";

const DropdownButton = styled.button(props => ({
  display: "block",
  width: "100%",
  cursor: props.disabled ? "default" : "pointer",
  color: themeGet(`colors.${props.color}`, props.color)(props),
  border: "none",
  textAlign: "left",
  backgroundColor: "transparent",
  lineHeight: props.theme.lineHeights.base,
  fontSize: props.theme.fontSizes.medium,
  transition: ".2s",
  padding: `${props.theme.space.x1} ${props.theme.space.x2} ${props.theme.space.x1} 12px`,
  borderLeft: `${props.theme.space.half} solid transparent`,
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
    borderLeft: `${props.theme.space.half}  solid ${props.theme.colors.blue}`
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
  color: "darkBlue",
  disabled: false,
  hoverColor: "darkBlue",
  bgHoverColor: "lightGrey"
};

export default DropdownButton;
