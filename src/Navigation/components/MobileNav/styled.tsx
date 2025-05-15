import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Box } from "../../../Box";
import { Text } from "../../../Type";
import { DefaultNDSThemeType } from "../../../theme";

export const IndentedContainer = styled(Box)<{ level: number }>(({ theme, level }) => ({
  paddingLeft: `calc(${level} * ${theme.space.x2})`,
}));

const padding = (theme: DefaultNDSThemeType) => ({
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
});

export const MenuItemGroupLabel = styled(Text)(({ theme }) => ({
  ...padding(theme),
  display: "flex",
  alignItems: "center",
  gap: theme.space.x1,
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.smallTextBase,
  width: "100%",
  textAlign: "left",
}));

export const MobileNavigationButton = styled(RadixNavigationMenu.Trigger).attrs({
  onPointerMove: (e) => e.preventDefault(),
  onPointerLeave: (e) => e.preventDefault(),
})(({ theme }) => ({
  ...padding(theme),
  background: "none",
  border: "none",
  outline: "none",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  gap: theme.space.x1,
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.smallTextBase,
  width: "100%",
  textAlign: "left",
}));

export const MobileNavigationLink = styled(RadixNavigationMenu.Link)(({ theme }) => ({
  ...padding(theme),
  background: "none",
  border: "none",
  outline: "none",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  gap: theme.space.x1,
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.smallTextBase,
  width: "100%",
  textDecoration: "none",
  textAlign: "left",
}));

export const MobileSecondaryLogoContainer = styled(RadixNavigationMenu.Sub)(({ theme }) => ({
  marginTop: theme.space.x2,
  padding: theme.space.x2,
  display: "flex",
  justifyContent: "center",
}));
