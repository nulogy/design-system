import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Box } from "../../../Box";
import { Text } from "../../../Type";

export const IndentedContainer = styled(Box)<{ level: number }>(({ theme, level }) => ({
  paddingLeft: `calc(${level} * ${theme.space.x2})`,
}));

export const MenuItemGroupLabel = styled(Text)(({ theme }) => ({
  color: theme.colors.midGrey,
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextBase,
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
}));

export const ButtonTrigger = styled(RadixNavigationMenu.Trigger).attrs({
  onPointerMove: (e) => e.preventDefault(),
  onPointerLeave: (e) => e.preventDefault(),
})(({ theme }) => ({
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
  padding: 0,
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  textAlign: "left",
}));

export const NavigationLink = styled(RadixNavigationMenu.Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.space.x1,
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.smallTextBase,
  textDecoration: "none",
  fontStyle: "normal",
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
}));
