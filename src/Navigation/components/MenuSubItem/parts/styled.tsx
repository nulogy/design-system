import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../../../../StyledProps";

export const SubMenuItemLink = styled(RadixNavigationMenu.Link)<StyledProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    padding: `${theme.space.x1} ${theme.space.x2}`,

    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.baseRelaxed,
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
    padding: `${theme.space.x1} ${theme.space.x2}`,
    gap: theme.space.x2,

    background: "none",
    border: "none",
    outline: "none",

    color: theme.colors.darkGrey,
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.baseRelaxed,
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
