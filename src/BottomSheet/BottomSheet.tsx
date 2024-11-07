import React from "react";
import { DialogContent as ReachDialogContent, DialogOverlay as ReachDialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import { transparentize } from "polished";
import { motion, AnimatePresence } from "framer-motion";
import { Heading2, Text } from "../Type";
import { Box } from "../Box";
import { Link } from "../Link";
import { Button, PrimaryButton, QuietButton } from "../Button";
import { Flex } from "../Flex";

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
  borderRadius: theme.radii.medium,
  height: "auto",
  margin: `0px ${theme.space.x2}`,
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
  borderTopLeftRadius: theme.radii.large,
  borderTopRightRadius: theme.radii.large,
  maxHeight: `calc(100dvh - ${theme.space.x7})`,
  boxShadow: theme.shadows.large,

  "@media (min-width: 768px)": {
    maxWidth: `calc(100% - ${theme.space.x8})`,
    maxHeight: "85.4dvh", // Golden Ratio
  },
}));

const WidthBoundedContent = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 704px;
  }
`;

const ContentContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

const overlayTransition = { duration: 0.25 };

const sheetTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

export const BottomSheet = ({ isOpen, onDismiss, children }) => {
  function handleSheetClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={overlayTransition}
          onClick={onDismiss}
          isOpen={isOpen}
        >
          <Sheet
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={sheetTransition}
            onClick={handleSheetClick}
          >
            <ContentContainer>
              <WidthBoundedContent>
                <BottomSheetHeader>
                  <BottomSheetHeading>Carry over</BottomSheetHeading>
                  <BottomSheetHelpText>
                    Carry over remaining quantity to a future PO line item.{" "}
                    <Link href="https://www.nulogy.com">Learn more</Link>
                  </BottomSheetHelpText>
                </BottomSheetHeader>
                <Box px="x3" py="x4">
                  {children}
                </Box>
              </WidthBoundedContent>
              <BottomSheetFooter>
                <Flex justifyContent="space-between">
                  <Button onClick={onDismiss}>Close</Button>
                  <Flex gap="x2">
                    <QuietButton onClick={onDismiss}>Reset</QuietButton>
                    <PrimaryButton onClick={onDismiss}>Carry over</PrimaryButton>
                  </Flex>
                </Flex>
              </BottomSheetFooter>
            </ContentContainer>
          </Sheet>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const BottomSheetFooter = styled.div(({ theme }) => ({
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

const BottomSheetHeader = styled.div`
  text-align: center;
  padding: 24px 24px 0 24px;
`;

const BottomSheetHeading = styled(Heading2)(({ theme }) => ({
  marginBottom: theme.space.x1,
}));

const BottomSheetHelpText = styled(Text)(({ theme }) => ({
  color: theme.colors.midGrey,
}));
