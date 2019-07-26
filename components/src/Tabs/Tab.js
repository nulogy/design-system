import styled from "styled-components";
import theme from "../theme";
import React from "react";

const barStyles = {
  expanded: {
    content: "''",
    backgroundColor: theme.colors.darkBlue,
    height: "3px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: "2px 2px 0 0"
  },
  default: {
    content: "''",
    backgroundColor: theme.colors.grey,
    height: "1px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
};

const getBarStyles = (selected, disabled) => {
  if (selected) {
    return {
      "&:before": barStyles.expanded
    };
  } else {
    return {
      "&:before": barStyles.default,
      "&:hover": {
        "&:before": !disabled
          ? {
              ...barStyles.expanded,
              backgroundColor: theme.colors.lightBlue
            }
          : null
      }
    };
  }
};

const Tab = styled.button(({ selected, disabled, fullWidth }) => ({
  width: fullWidth ? "100%" : undefined,
  fontWeight: theme.fontWeights.medium,
  textDecoration: "none",
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  cursor: disabled ? "default" : "pointer",
  color: theme.colors.darkBlue,
  backgroundColor: "transparent",
  border: "none",
  margin: theme.space.none,
  padding: `${theme.space.x1} ${theme.space.x3}`,
  position: "relative",
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.blue,
    boxShadow: theme.shadows.focus,
    "&:hover": {}
  },
  "&:active": {},
  "&:disabled": {
    opacity: ".5"
  },
  ...getBarStyles(selected, disabled)
}));

export default Tab;
