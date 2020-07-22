import styled from "styled-components";
import PropTypes from "prop-types";

const DropdownItem = styled.div(({ theme, color, hoverColor, bgHoverColor }) => ({
  "*": {
    color: theme.colors[color],
    display: "block",
    width: "100%",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    transition: ".2s",
    fontSize: `${theme.fontSizes.medium}`,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    "&:hover, &:focus": {
      outline: "none",
      color: theme.colors[hoverColor],
      backgroundColor: theme.colors[bgHoverColor]
    },
    "&:disabled": {
      opacity: ".5"
    },
    "&:visited": {
      color: theme.colors[hoverColor]
    },
    "&:active": {
      color: theme.colors[hoverColor]
    }
  }
}));

DropdownItem.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  bgHoverColor: PropTypes.string
};

DropdownItem.defaultProps = {
  color: "darkBlue",
  hoverColor: "darkBlue",
  bgHoverColor: "lightGrey"
};

export default DropdownItem;
