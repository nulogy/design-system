import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled, { CSSProperties } from "styled-components";
import { Icon } from "../../../Icon";
import { DefaultNDSThemeType } from "../../../theme";
import { IconProps } from "../../../Icon/Icon";
import { addStyledProps, StyledProps } from "../../../StyledProps";
import { NAVIGATION_MENU_HEIGHT_STYLED_UNITS } from "./constants";

function itemStyles(theme: DefaultNDSThemeType): CSSProperties {
  return {
    paddingLeft: theme.space.x2,
    paddingRight: theme.space.x2,
    paddingTop: theme.space.x1_5,
    paddingBottom: theme.space.x1_5,
    outline: "none",
    userSelect: "none",
    fontWeight: 500,
    fontSize: theme.fontSizes.small,
    lineHeight: theme.lineHeights.smallTextCompressed,
    borderRadius: theme.radii.large,
    color: theme.colors.darkGrey,
    transition: "background-color 250ms ease",
    whiteSpace: "nowrap",
  };
}

export const NavigationMenuRoot = styled(RadixNavigationMenu.Root)<StyledProps>(
  ({ theme }) => ({
    height: theme.space[NAVIGATION_MENU_HEIGHT_STYLED_UNITS],
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0px 16px",
    backgroundColor: "white",
    borderBottom: "1px solid #E4E7EB",

    "& > div": {
      display: "flex",
    },
  }),
  addStyledProps
);

export const NavigationMenuList = styled(RadixNavigationMenu.List)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.space.none,
  listStyle: "none",
  gap: theme.space.x1,
  margin: theme.space.none,
}));

interface NavigationMenuTriggerProps extends RadixNavigationMenu.NavigationMenuTriggerProps, StyledProps {
  hasTooltip?: boolean;
}

export const NavigationMenuTrigger = styled(RadixNavigationMenu.Trigger).attrs<NavigationMenuTriggerProps>(
  ({ hasTooltip = false }) => {
    if (!hasTooltip) {
      return {
        onPointerEnter: (event) => event.preventDefault(),
        onPointerMove: (event) => event.preventDefault(),
        onPointerLeave: (event) => event.preventDefault(),
      };
    }
  }
)(
  ({ theme }) => ({
    all: "unset",
    ...itemStyles(theme),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space.half,
    "&:focus": { boxShadow: theme.shadows.focus },
    "&:hover": { backgroundColor: theme.colors.lightBlue },
  }),
  addStyledProps
);

export const NavigationMenuLink = styled(RadixNavigationMenu.Link)<StyledProps>(
  ({ theme }) => ({
    ...itemStyles(theme),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textDecoration: "none",
    fontSize: theme.fontSizes.small,
    lineHeight: theme.lineHeights.smallTextCompressed,
    "&:focus": { boxShadow: theme.shadows.focus },
    "&:hover": { backgroundColor: theme.colors.lightBlue },
  }),
  addStyledProps
);

export const NavigationMenuIconLink = styled(NavigationMenuLink).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})(({ theme }) => ({
  paddingRight: theme.space.x1,
  borderRadius: theme.radii.rounded,
}));

export const NavigationMenuIconTrigger = styled(NavigationMenuTrigger).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})(({ theme }) => ({
  padding: theme.space.x1,
  borderRadius: theme.radii.rounded,
}));

export const CaretDown = styled(Icon).attrs({
  icon: "downArrow",
})<Partial<IconProps>>(({ theme }) => ({
  position: "relative",
  color: theme.colors.darkGrey,
  transition: "transform 250ms ease",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
}));

export const CaretRight = styled(Icon).attrs({
  icon: "rightArrow",
})<Partial<IconProps>>(({ theme }) => ({
  position: "relative",
  color: theme.colors.darkGrey,
}));

export const RadixNavigationMenuItem = styled(RadixNavigationMenu.Item)<StyledProps>(
  {
    position: "relative",
  },
  addStyledProps
);
