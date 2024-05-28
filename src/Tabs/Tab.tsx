import React from "react";
import styled, { CSSObject } from "styled-components";
import { variant } from "styled-system";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

const barStyles = (theme): { expanded: CSSObject; default: CSSObject } => ({
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
    zIndex: theme.zIndices.tabsBar,
  },
});

const getBarStyles = (selected, theme) => (selected ? barStyles(theme).expanded : barStyles(theme).default);
const getBarHoverStyles = (selected, disabled, theme) => {
  if (disabled || selected) {
    return null;
  }

  return {
    ...barStyles(theme).expanded,
    backgroundColor: theme.colors.lightBlue,
  };
};

type TabButtonProps = React.ComponentPropsWithRef<"button"> & {
  size?: ComponentSize;
  selected?: boolean;
  fullWidth?: boolean;
};

const TabButton = styled.button<TabButtonProps>(
  ({ selected, disabled, fullWidth, theme }) => ({
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
    position: "relative",
    paddingTop: theme.space.x1,
    paddingBottom: theme.space.x1,
    paddingLeft: theme.space.x3,
    paddingRight: theme.space.x3,

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
  }),
  variant({
    prop: "size",
    variants: {
      large: {
        py: "x2",
        px: "x4",
      },
      medium: {
        py: "x1",
        px: "x3",
      },
    },
  })
);

type TabProps = TabButtonProps & {
  label?: React.ReactNode;
};

const Tab: React.FC<React.PropsWithChildren<TabProps>> = React.forwardRef(({ label, ...props }, ref) => (
  <TabButton role="tab" type="button" ref={ref} {...props}>
    {label}
  </TabButton>
));
Tab.defaultProps = {
  label: null,
};
export default Tab;
