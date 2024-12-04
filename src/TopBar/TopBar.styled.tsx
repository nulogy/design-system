import { DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import { transparentize } from "polished";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";
import { TOPBAR } from "./constants";

const MenuItemList = styled.ul(({ theme }) => ({
  display: "grid",
  width: "100%",
  gap: theme.space.x1,
  flexWrap: "wrap",
  listStyle: "none",
  padding: theme.space.x3,
  margin: 0,
  maxHeight: `calc(100dvh - ${theme.space[TOPBAR.themedHeight]})`,
  overflow: "auto",
  gridTemplateColumns: "1fr",

  [`@media (min-width: ${theme.breakpoints.medium})`]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [`@media (min-width: ${theme.breakpoints.large})`]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const Header = styled.header(({ theme }) => ({
  userSelect: "none",
  touchAction: "none",
  position: "sticky",
  top: "0",
  zIndex: theme.zIndices.navBar,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: theme.colors.lightGrey,
  background: transparentize(0.4, theme.colors.white),
  backdropFilter: "blur(8px)",
  width: "100dvw",
}));

const Navigation = styled.nav(({ theme }) => ({
  height: theme.space[TOPBAR.themedHeight],
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.space.x2,
  paddingRight: theme.space.x1,
}));

const StylelessButton = styled.button<StyledProps>(
  {
    backgroundColor: "transparent",
    border: "none",
    margin: 0,
    padding: 0,
    textAlign: "inherit",
    font: "inherit",
    borderRadius: 0,
    appearance: "none",
  },
  addStyledProps
);

const MenuButton = styled(StylelessButton)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.space.x1,
  borderRadius: theme.radii.medium,
  transition: "background-color 0.2s",
  cursor: "pointer",

  "&:active, &:hover": {
    backgroundColor: theme.colors.lightGrey,
  },
}));

const NavigationItemsList = styled.ul({
  padding: 0,
  margin: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  listStyle: "none",
  whiteSpace: "nowrap",
});

const StyledBackLink = styled.a(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: theme.colors.midGrey,
  textDecoration: "none",
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
}));

const StyledPageTitle = styled.li(({ theme }) => ({
  paddingLeft: theme.space.x1,
  paddingRight: theme.space.x1,
  color: theme.colors.darkGrey,
  textDecoration: "none",
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.base,
  whiteSpace: "nowrap",
  flex: "auto",
  textAlign: "center",
  textOverflow: "ellipsis",
  overflow: "hidden",
}));

const Overlay = styled(motion(DialogOverlay))(({ theme }) => ({
  position: "fixed",
  top: theme.space[TOPBAR.themedHeight],
  bottom: theme.space.none,
  left: theme.space.none,
  right: theme.space.none,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  backgroundColor: transparentize(0.85, theme.colors.white),
}));

const TileLink = styled.a(({ theme }) => ({
  backgroundColor: transparentize(0.15)(theme.colors.blackBlue),
  borderRadius: theme.radii.large,
  display: "flex",
  height: "100%",
  alignItems: "flex-start",
  padding: theme.space.x2,
  textDecoration: "none",
  color: theme.colors.white,
  gap: theme.space.x1_5,
  whiteSpace: "nowrap",
  textOverflow: "hidden",
}));

const StyledMenuItem = styled(motion.li)(({ theme }) => ({
  "&:only-child": {
    [`@media (min-width: ${theme.breakpoints.medium})`]: {
      gridColumn: "span 2",
    },
    [`@media (min-width: ${theme.breakpoints.large})`]: {
      gridColumn: "span 3",
    },
  },

  [`@media (min-width: ${theme.breakpoints.large})`]: {
    "&:first-child:nth-last-child(2), &:last-child:nth-child(2)": {
      gridColumn: "span 3",
    },
  },
}));

export {
  Navigation,
  Header,
  NavigationItemsList,
  StyledBackLink,
  StyledPageTitle,
  Overlay,
  TileLink,
  StylelessButton,
  MenuItemList,
  MenuButton,
  StyledMenuItem,
};
