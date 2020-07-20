import styled from "styled-components";
import PropTypes from "prop-types";
import { color } from "styled-system";

const DropdownButton = styled.button(color, ({ disabled, theme, hoverColor, bgHoverColor }) => ({
  display: "block",
  width: "100%",
  cursor: disabled ? "default" : "pointer",
  border: "none",
  textAlign: "left",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  fontSize: theme.fontSizes.medium,
  transition: ".2s",
  padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
  borderLeft: `${theme.space.half} solid transparent`,
  "&:hover": {
    color: theme.colors[hoverColor],
    backgroundColor: disabled ? "transparent" : theme.colors[bgHoverColor]
  },
  "&:focus": {
    outline: "none",
    color: theme.colors[hoverColor],
    backgroundColor: theme.colors[bgHoverColor],
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
  color: "darkBlue",
  disabled: false,
  hoverColor: "darkBlue",
  bgHoverColor: "lightGrey"
};

export default DropdownButton;
