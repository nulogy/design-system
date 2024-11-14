import {
  DialogContent as ReachDialogContent,
  DialogContentProps,
  DialogOverlay as ReachDialogOverlay,
} from "@reach/dialog";
import type { AnimationProps } from "framer-motion";
import { motion } from "framer-motion";
import { transparentize } from "polished";
import styled from "styled-components";
import { compose, height, layout, maxHeight, maxWidth, space, styleFn, width } from "styled-system";
import type { HeightProps, LayoutProps, MaxHeightProps, MaxWidthProps, SpaceProps, WidthProps } from "styled-system";
import { Heading2, Text } from "../Type";
import { excludeStyledProps } from "../StyledProps";

const Overlay = styled(motion(ReachDialogOverlay))(({ theme }) => ({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: transparentize(0.5, theme.colors.blackBlue),
}));

interface SheetProps
  extends DialogContentProps,
    AnimationProps,
    WidthProps,
    MaxWidthProps,
    HeightProps,
    MaxHeightProps,
    SpaceProps,
    LayoutProps {}

const styleFns = [width, maxWidth, height, maxHeight, space, layout];

const Sheet = styled(motion(ReachDialogContent)).withConfig({
  shouldForwardProp: excludeStyledProps(...styleFns),
})<SheetProps>(
  ({ theme }) => ({
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
    boxShadow: theme.shadows.large,
  }),
  compose(...styleFns)
);

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

export { Overlay, Sheet, ContentContainer, Footer, Header, Title, HelpText };
