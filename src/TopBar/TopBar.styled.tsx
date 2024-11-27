import { DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import { transparentize } from "polished";
import styled from "styled-components";
import { TOPBAR } from "./constants";

const Header = styled.header(({ theme }) => ({
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
  paddingTop: theme.space.half,
  paddingBottom: theme.space.half,
  paddingLeft: theme.space.x2,
  paddingRight: theme.space.x2,
}));

const StylelessButton = styled.button(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  margin: 0,
  padding: 0,
  textAlign: "inherit",
  font: "inherit",
  borderRadius: 0,
  appearance: "none",
}));

const NavigationItemsList = styled.ul((_) => ({
  padding: 0,
  margin: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  listStyle: "none",
  whiteSpace: "nowrap",
}));

const BackButton = styled.a(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: theme.colors.black,
  textDecoration: "none",
  fontSize: theme.fontSizes.md,
}));

const CurrentPageItem = styled.li(({ theme }) => ({
  paddingLeft: theme.space.x1,
  paddingRight: theme.space.x1,
  color: theme.colors.black,
  textDecoration: "none",
  fontSize: theme.fontSizes.md,
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
  justifyContent: "flex-start",
  backgroundColor: transparentize(0.85, theme.colors.white),
}));

const TileLink = styled(motion.a)(({ theme }) => ({
  backgroundColor: transparentize(0.25)(theme.colors.blackBlue),
  borderRadius: theme.radii.large,
  display: "flex",
  alignItems: "flex-start",
  padding: theme.space.x2,
  textDecoration: "none",
  color: theme.colors.white,
  gap: theme.space.x1_5,
  whiteSpace: "nowrap",
  textOverflow: "hidden",
}));

export { Navigation, Header, NavigationItemsList, BackButton, CurrentPageItem, Overlay, TileLink, StylelessButton };
