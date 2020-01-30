import styled from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "@styled-system/theme-get";
import theme from "../theme";

const DropdownItem = styled.div(props => ({
  "*": {
    display: "block",
    width: "100%",
    cursor: "pointer",
    color: themeGet(`colors.${props.color}`, props.color)(props),
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    transition: ".2s",
    fontSize: `${theme.fontSizes.medium}`,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    "&:hover, &:focus": {
      outline: "none",
      color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props),
      backgroundColor: themeGet(`colors.${props.bgHoverColor}`, props.bgHoverColor)(props)
    },
    "&:disabled": {
      opacity: ".5"
    },
    "&:visited": {
      color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props)
    },
    "&:active": {
      color: themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props)
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
