import {
  type DialogContentProps,
  type DialogOverlayProps,
  DialogContent as ReachDialogContent,
  DialogOverlay as ReachDialogOverlay,
} from "@reach/dialog";
import type { MotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { transparentize } from "polished";
import type React from "react";
import { styled } from "styled-components";
import type { HeightProps, LayoutProps, MaxHeightProps, MaxWidthProps, SpaceProps, WidthProps } from "styled-system";
import { compose, height, layout, maxHeight, maxWidth, space, width } from "styled-system";
import { excludeStyledProps } from "../StyledProps";
import { Heading2, Text } from "../Type";

// Portal + focus-lock + scroll-lock wrapper (no visual styles)
const OverlayDialog = styled(ReachDialogOverlay as React.ComponentType<DialogOverlayProps>)({});

// Animated backdrop
const Overlay = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: transparentize(0.5, theme.colors.blackBlue),
  zIndex: theme.zIndices.overlay,
}));

// Transparent a11y wrapper (role="dialog", aria-modal, focus containment)
const SheetDialog = styled(ReachDialogContent as React.ComponentType<DialogContentProps>)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: 0,
  background: "none",
});

interface SheetProps
  extends MotionProps,
    WidthProps,
    MaxWidthProps,
    HeightProps,
    MaxHeightProps,
    SpaceProps,
    LayoutProps {}

const styleFns = [width, maxWidth, height, maxHeight, space, layout];

const Sheet = styled(motion.div).withConfig({
  shouldForwardProp: excludeStyledProps(...styleFns),
})<SheetProps>(
  ({ theme }) => ({
    "&:focus": {
      outline: "none",
    },
    inset: 0,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radii.large,
    borderTopRightRadius: theme.radii.large,
    height: "auto",
    padding: 0,
    "*": {
      boxSizing: "border-box",
      WebkitTapHighlightColor: "transparent",
    },
    color: theme.colors.black,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    WebkitFontSmoothing: "antialiased",
    WebkitTapHighlightColor: "transparent",
    MozOsxFontSmoothing: "grayscale",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    background: "white",
    boxShadow: theme.shadows.large,
  }),
  compose(...styleFns),
);

const ContentContainer = styled.div(() => ({
  overflowY: "auto",
  flex: 1,
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",

  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Footer = styled.div(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  marginLeft: theme.space.x1,
  marginRight: theme.space.x1,
  padding: theme.space.x2,
  background: transparentize(0.4, theme.colors.white),
  backdropFilter: "blur(8px)",
  borderTop: "1px solid",
  borderTopColor: theme.colors.lightGrey,
  marginTop: "auto",
}));

const Header = styled.div(({ theme }) => ({
  textAlign: "left",
  paddingTop: theme.space.x3,
  paddingLeft: theme.space.x3,
  paddingRight: theme.space.x3,
  paddingBottom: theme.space.none,
}));

const Title = styled(Heading2)(({ theme }) => ({
  marginBottom: theme.space.x1,
}));

const HelpText = styled(Text)(({ theme }) => ({
  color: theme.colors.midGrey,
  "&, *": {
    fontSize: theme.fontSizes.small,
  },
}));

export { ContentContainer, Footer, Header, HelpText, Overlay, OverlayDialog, Sheet, SheetDialog, Title };
