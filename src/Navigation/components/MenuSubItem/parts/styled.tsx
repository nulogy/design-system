import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../../../../StyledProps";
import { NAVIGATION_SUB_MENU_MIN_WIDTH_PX } from "../../shared/constants";

export const SubMenuItemLink = styled(RadixNavigationMenu.Link)<StyledProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    padding: `${theme.space.x1} ${theme.space.x2}`,

    fontWeight: theme.fontWeights.medium,
    // fontSize: theme.fontSizes.base,
    // lineHeight: theme.lineHeights.baseRelaxed,

    fontSize: theme.fontSizes.small,
    lineHeight: theme.lineHeights.smallTextCompressed,

    whiteSpace: "nowrap",
    textDecoration: "none",

    transition: "background-color 250ms ease",

    "&:hover, &:focus": {
      backgroundColor: theme.colors.lightBlue,
    },
    "&:visited": {
      color: "inherit",
    },
  }),
  addStyledProps
);

export const SubMenuItemButton = styled(RadixNavigationMenu.Trigger)<StyledProps>(
  ({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: theme.space.x1,
    paddingBottom: theme.space.x1,
    paddingLeft: theme.space.x1_5,
    paddingRight: theme.space.x1_5,
    gap: theme.space.x2,

    background: "none",
    border: "none",
    outline: "none",

    color: theme.colors.darkGrey,
    fontSize: theme.fontSizes.small,
    lineHeight: theme.lineHeights.smallRelaxed,
    fontWeight: theme.fontWeights.medium,
    whiteSpace: "nowrap",

    userSelect: "none",
    transition: "background-color 250ms ease",

    "&:hover, &:focus": {
      backgroundColor: theme.colors.lightBlue,
      color: theme.colors.darkBlue,
    },
  }),
  addStyledProps
);

export const SubMenuContent = styled(RadixNavigationMenu.Content)<StyledProps>(
  ({ theme }) => ({
    position: "absolute",
    top: `calc(100% + ${theme.space.half})`,
    left: 0,
    minWidth: NAVIGATION_SUB_MENU_MIN_WIDTH_PX,

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    background: theme.colors.white,
    color: theme.colors.darkGrey,
    borderRadius: theme.radii.medium,
    boxShadow: theme.shadows.medium,

    paddingTop: theme.space.x1,
    paddingRight: 0,
    paddingBottom: theme.space.x1,
    paddingLeft: 0,

    listStyle: "none",

    "& > div": {
      width: "100%",
    },
  }),
  addStyledProps
);

export const SubMenuItem = styled(RadixNavigationMenu.Item)<StyledProps>(
  {
    position: "relative",
    width: "100%",
  },
  addStyledProps
);

export const SubMenuList = styled(RadixNavigationMenu.List)<StyledProps>(
  {
    padding: 0,
    listStyle: "none",
  },
  addStyledProps
);
