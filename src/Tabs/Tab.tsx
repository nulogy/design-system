// @ts-nocheck
import React from "react";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
const barStyles = (theme) => ({
  expanded: {
    content: "''",
    backgroundColor: theme.colors.darkBlue,
    height: "3px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: "2px 2px 0 0",
  },
  default: {
    content: "''",
    backgroundColor: theme.colors.grey,
    height: "1px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.tabsBar,
  },
});
const getBarStyles = (selected, theme) =>
  selected ? barStyles(theme).expanded : barStyles(theme).default;
const getBarHoverStyles = (selected, disabled, theme) => {
  if (disabled || selected) {
    return null;
  } else {
    return {
      ...barStyles(theme).expanded,
      backgroundColor: theme.colors.lightBlue,
    };
  }
};

type TabButtonProps = React.ComponentPropsWithRef<"button"> & {
  selected?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  theme?: DefaultNDSThemeType;
};
const TabButton: React.SFC<TabButtonProps> = styled.button(
  ({ selected, disabled, fullWidth, theme }: TabButtonProps): any => ({
    width: fullWidth ? "100%" : undefined,
    fontWeight: theme.fontWeights.medium,
    textDecoration: "none",
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    cursor: disabled ? "default" : "pointer",
    color: theme.colors.darkBlue,
    backgroundColor: "transparent",
    border: "none",
    margin: theme.space.none,
    padding: `${theme.space.x1} ${theme.space.x3}`,
    position: "relative",
    "&:focus": {
      outline: "none",
      backgroundColor: theme.colors.lightBlue,
      "&:hover": {},
    },
    "&:active": {},
    "&:disabled": {
      opacity: ".5",
    },
    "&:before": {
      ...getBarStyles(selected, theme),
    },
    "&:hover": {
      "&:before": {
        ...getBarHoverStyles(selected, disabled, theme),
      },
    },
  })
);
type TabProps = React.ComponentPropsWithRef<"button"> & {
  label?: React.ReactNode;
};
const Tab: React.SFC<TabProps> = React.forwardRef(
  ({ label, ...props }, ref) => (
    <TabButton role="tab" type="button" ref={ref} {...props}>
      {label}
    </TabButton>
  )
);
Tab.defaultProps = {
  label: null,
};
export default Tab;
