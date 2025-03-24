import { DialogContentProps, DialogOverlayProps } from "@reach/dialog";
import { AnimatePresence, AnimatePresenceProps } from "framer-motion";
import React from "react";
import { HeightProps, LayoutProps, MaxHeightProps, MaxWidthProps, SpaceProps, WidthProps } from "styled-system";
import { Overlay, Sheet, ContentContainer, Footer, Header, Title, HelpText } from "./BottomSheet.styled";
import { BottomSheetProvider, useBottomSheet } from "./BottomSheetProvider";

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

interface RootProps extends AnimatePresenceProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Root({ isOpen, onClose, children, ...props }: RootProps) {
  return (
    <AnimatePresence {...props}>
      {isOpen && (
        <BottomSheetProvider isOpen={isOpen} onClose={onClose}>
          {children}
        </BottomSheetProvider>
      )}
    </AnimatePresence>
  );
}

interface OverlayPartProps extends DialogOverlayProps {
  closeOnClick?: boolean;
}

function OverlayPart({ closeOnClick, children, ...props }: OverlayPartProps) {
  const { onClose, isOpen } = useBottomSheet();
  const [isAnimationComplete, setAnimationComplete] = React.useState(false);

  return (
    <Overlay
      data-testid="bottom-sheet-overlay"
      data-visible={isAnimationComplete ? true : undefined}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={transition}
      onAnimationComplete={() => {
        if (isOpen) {
          setAnimationComplete(true);
        }
      }}
      onClick={closeOnClick ? onClose : undefined}
      isOpen={isOpen}
      {...props}
    >
      {children}
    </Overlay>
  );
}

interface SheetPartProps
  extends DialogContentProps,
    WidthProps,
    MaxWidthProps,
    HeightProps,
    MaxHeightProps,
    SpaceProps,
    LayoutProps {
  children: React.ReactNode;
  "aria-label": string;
}

function SheetPart({ children, ...props }: SheetPartProps) {
  const { isOpen } = useBottomSheet();
  const [isAnimationComplete, setAnimationComplete] = React.useState(false);

  function handleSheetClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <Sheet
      data-testid="bottom-sheet-body"
      aria-label={props["aria-label"]}
      data-visible={isAnimationComplete ? true : undefined}
      variants={sheetVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={transition}
      onAnimationComplete={() => {
        if (isOpen) {
          setAnimationComplete(true);
        }
      }}
      onClick={handleSheetClick}
      {...props}
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
