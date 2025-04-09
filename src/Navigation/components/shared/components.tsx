import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styled, { CSSProperties } from "styled-components";
import { Icon } from "../../../Icon";
import { DefaultNDSThemeType } from "../../../theme";
import { IconProps } from "../../../Icon/Icon";

function itemStyles(theme: DefaultNDSThemeType): CSSProperties {
  return {
    padding: theme.space.x1,
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

export const NavigationMenuRoot = styled(NavigationMenu.Root)({
  display: "block",

  "& > div": {
    display: "flex",
  },
});

export const NavigationMenuList = styled(NavigationMenu.List)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.space.none,
  listStyle: "none",
  gap: theme.space.x1,
  margin: theme.space.none,
}));

export const NavigationMenuTrigger = styled(NavigationMenu.Trigger).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})(({ theme }) => ({
  all: "unset",
  ...itemStyles(theme),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  "&:focus": { boxShadow: theme.shadows.focus },
  "&:hover": { backgroundColor: theme.colors.lightBlue },
}));

export const NavigationMenuLink = styled(NavigationMenu.Link)(({ theme }) => ({
  ...itemStyles(theme),
  display: "block",
  textDecoration: "none",
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextCompressed,
  "&:focus": { boxShadow: theme.shadows.focus },
  "&:hover": { backgroundColor: theme.colors.lightBlue },
}));

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
