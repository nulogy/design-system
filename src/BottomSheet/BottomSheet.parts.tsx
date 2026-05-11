import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, type AnimatePresenceProps } from "framer-motion";
import React from "react";
import type { HeightProps, LayoutProps, MaxHeightProps, MaxWidthProps, SpaceProps, WidthProps } from "styled-system";
import { useScrollLock } from "../utils/useScrollLock";
import { ContentContainer, Footer, Header, HelpText, Overlay, Sheet, Title } from "./BottomSheet.styled";
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
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

interface RootProps extends AnimatePresenceProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Root({ isOpen, onClose, children, ...props }: RootProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AnimatePresence {...props}>
        {isOpen && (
          <BottomSheetProvider key="bottom-sheet" isOpen={isOpen} onClose={onClose}>
            {children}
          </BottomSheetProvider>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

interface OverlayPartProps {
  closeOnClick?: boolean;
  children: React.ReactNode;
}

function OverlayPart({ closeOnClick, children }: OverlayPartProps) {
  const { onClose, isOpen } = useBottomSheet();
  const [isAnimationComplete, setAnimationComplete] = React.useState(false);

  return (
    <Dialog.Portal forceMount>
      <Dialog.Overlay asChild forceMount>
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
        >
          {children}
        </Overlay>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}

interface SheetPartProps extends WidthProps, MaxWidthProps, HeightProps, MaxHeightProps, SpaceProps, LayoutProps {
  children: React.ReactNode;
  "aria-label": string;
}

function SheetPart({ children, "aria-label": ariaLabel, ...props }: SheetPartProps) {
  const { isOpen } = useBottomSheet();
  const [isAnimationComplete, setAnimationComplete] = React.useState(false);
  useScrollLock();

  function handleSheetClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <Dialog.Content
      asChild
      forceMount
      aria-label={ariaLabel}
      onEscapeKeyDown={(e) => e.preventDefault()}
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <Sheet
        data-testid="bottom-sheet-body"
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
    </Dialog.Content>
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
