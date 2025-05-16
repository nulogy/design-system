import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../../../../StyledProps";
import { NAVIGATION_SUB_MENU_MIN_WIDTH_PX } from "../../shared/constants";
import { disableMenuToggleOnHover } from "../../shared/disableMenuToggleOnHover";
import { DefaultNDSThemeType } from "../../../../theme";
const getSharedPaddingStyles = (theme: DefaultNDSThemeType) => ({
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
});

const getSharedInteractiveItemStyles = (theme: DefaultNDSThemeType) => ({
  paddingLeft: theme.space.x1_5,
  paddingRight: theme.space.x1_5,
  fontWeight: theme.fontWeights.medium,
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallRelaxed,
  whiteSpace: "nowrap",
  transition: "background-color 250ms ease",
});

export const SubMenuItemLink = styled(RadixNavigationMenu.Link)<StyledProps>(
  ({ theme }) => ({
    ...getSharedPaddingStyles(theme),
    ...getSharedInteractiveItemStyles(theme),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    textDecoration: "none",
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
    ...getSharedPaddingStyles(theme),
    ...getSharedInteractiveItemStyles(theme),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: theme.space.x2,
    background: "none",
    border: "none",
    outline: "none",
    color: theme.colors.darkGrey,
    userSelect: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.colors.lightBlue,
      color: theme.colors.darkBlue,
    },
  }),
  addStyledProps
);

export const SubMenuContent = styled(RadixNavigationMenu.Content).attrs(disableMenuToggleOnHover)<StyledProps>(
  ({ theme }) => ({
    ...getSharedPaddingStyles(theme),
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
    paddingRight: 0,
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
