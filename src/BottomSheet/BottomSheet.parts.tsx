import React from "react";
import { DialogContent as ReachDialogContent, DialogOverlay as ReachDialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import { transparentize } from "polished";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Heading2, Text } from "../Type";

const Overlay = styled(motion(ReachDialogOverlay))(({ theme }) => ({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: transparentize(0.5, theme.colors.blackBlue),
}));

const Sheet = styled(motion(ReachDialogContent))(({ theme }) => ({
  ":focus": {
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
  width: "100%",
  maxHeight: `calc(100dvh - ${theme.space.x7})`,
  boxShadow: theme.shadows.large,

  [`@media (min-width: ${theme.breakpoints.small})`]: {
    maxWidth: `calc(100% - ${theme.space.x8})`,
    maxHeight: "85.4dvh", // Golden Ratio
  },
}));

const ContentContainer = styled.div((_) => ({
  overflowY: "auto",
  flex: 1,
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",

  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Footer = styled.div(({ theme }) => ({
  position: "sticky",
  bottom: 0,
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
  textAlign: "center",
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

const transition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

function Root({ isOpen, onClose, children }) {
  return <AnimatePresence>{isOpen && children}</AnimatePresence>;
}

function OverlayPart({ closeOnClick, onClose, isOpen, children }) {
  return (
    <Overlay
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={transition}
      onClick={closeOnClick ? onClose : undefined}
      isOpen={isOpen}
    >
      {children}
    </Overlay>
  );
}

function SheetPart({ children, onClose }) {
  function handleSheetClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <Sheet
      variants={sheetVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={transition}
      onClick={handleSheetClick}
    >
      {children}
    </Sheet>
  );
}

export const BottomSheetParts = {
  Root,
  Overlay: OverlayPart,
  Sheet: SheetPart,
  ContentContainer,
  Header,
  Title,
  HelpText,
  Footer,
};
