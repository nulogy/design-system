import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { addStyledProps } from "../../../../StyledProps";
import { DefaultNDSThemeType } from "../../../../theme/theme.type";

const baseUserMenuItemStyles = (theme: DefaultNDSThemeType, isMobile?: boolean) => ({
  width: "100%",
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
  paddingTop: theme.space.x1_5,
  paddingBottom: theme.space.x1_5,
  paddingLeft: theme.space.x2,
  paddingRight: theme.space.x2,
  ...(!isMobile && {
    "&:hover, &:focus": {
      backgroundColor: theme.colors.lightBlue,
      color: theme.colors.darkBlue,
      outline: "none",
    },
  }),
  ...(isMobile && {
    "&:hover": {
      // No background or color change on hover for mobile
    },
    "&:focus": {
      backgroundColor: "transparent", // Ensure no background change
      color: theme.colors.darkBlue,
      outline: "none",
    },
  }),
});

export const UserMenuLink = styled(RadixNavigationMenu.Link)<{ $isMobile?: boolean }>(
  ({ theme, $isMobile }) => ({
    ...baseUserMenuItemStyles(theme, $isMobile),
    display: "block",
    textDecoration: "none",
  }),
  addStyledProps
);

export const UserMenuTrigger = styled(RadixNavigationMenu.Trigger)<{ $isMobile?: boolean }>(
  ({ theme, $isMobile }) => ({
    ...baseUserMenuItemStyles(theme, $isMobile),
    background: "none",
    border: "none",
    userSelect: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
  }),
  addStyledProps
);
