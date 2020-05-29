import styled from "styled-components";
import PropTypes from "prop-types";

const DropdownItem = styled.div(({ theme, hoverColor, bgHoverColor }) => ({
  "*": {
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
      color: hoverColor,
      backgroundColor: bgHoverColor
    },
    "&:disabled": {
      opacity: ".5"
    },
    "&:visited": {
      color: hoverColor
    },
    "&:active": {
      color: hoverColor
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
