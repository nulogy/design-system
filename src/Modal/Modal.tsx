import React, { useEffect } from "react";
import { styled, useTheme } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { transparentize } from "polished";
import { Heading2 } from "../Type";
import { useScrollLock } from "../utils/useScrollLock";
import ModalContent from "./ModalContent";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalCloseButton from "./ModalCloseButton";

const StyledDialogOverlay = styled(Dialog.Overlay)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: transparentize(0.5, theme.colors.blackBlue),
  zIndex: theme.zIndices.overlay,
}));

const StyledDialogContent = styled(Dialog.Content)<{ $maxWidth?: string }>(({ theme, $maxWidth }) => ({
  "&:focus": {
    outline: "none",
  },
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  boxShadow: theme.shadows.large,
  width: `calc(100% - ${theme.space.x4})`,
  maxWidth: $maxWidth,
  maxHeight: `calc(100vh - ${theme.space.x8})`,
  height: "auto",
  overflow: "hidden",
  padding: 0,
  zIndex: theme.zIndices.overlay,
  [`@media only screen and (max-width: ${theme.breakpoints.small})`]: {
    maxWidth: "100%",
    width: "100%",
  },
  "*": {
    boxSizing: "border-box",
  },
  color: theme.colors.black,
  fontFamily: theme.fonts.base,
  fontSize: theme.fontSizes.base,
  lineHeight: theme.lineHeights.base,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
}));

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  ariaLabel?: string;
  onRequestClose?: () => void;
  closeAriaLabel?: string;
  onAfterOpen?: () => void;
  shouldFocusAfterRender?: boolean;
  shouldReturnFocusAfterClose?: boolean;
  ariaDescribedBy?: string;
  maxWidth?: string;
  /** @deprecated No-op. Radix handles portal class automatically. */
  portalClassName?: string;
  /** @deprecated No-op. Use className for the modal content element. */
  overlayClassName?: string;
  className?: string;
  id?: string;
  /** @deprecated No-op. Radix handles aria-modal automatically. */
  appElement?: JSX.Element;
  /** @deprecated No-op. Radix handles aria hiding automatically. */
  ariaHideApp?: boolean;
  footerContent?: React.ReactNode;
  parentSelector?: () => HTMLElement;
}

function Modal({
  isOpen = true,
  shouldFocusAfterRender = true,
  shouldReturnFocusAfterClose = true,
  maxWidth = "624px",
  children,
  title,
  onRequestClose,
  onAfterOpen,
  ariaLabel,
  ariaDescribedBy,
  className,
  id,
  footerContent,
  closeAriaLabel,
  parentSelector,
  // accepted but unused (no-ops):
  portalClassName: _portalClassName,
  overlayClassName: _overlayClassName,
  appElement: _appElement,
  ariaHideApp: _ariaHideApp,
}: ModalProps) {
  const modalHasHeader = Boolean(onRequestClose || title);
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onRequestClose?.();
      }}
    >
      <Dialog.Portal container={parentSelector?.()}>
        <StyledDialogOverlay />
        <StyledDialogContent
          $maxWidth={maxWidth}
          aria-label={!title ? ariaLabel : undefined}
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={ariaDescribedBy}
          className={className}
          id={id}
          onOpenAutoFocus={(e) => {
            if (!shouldFocusAfterRender) e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            if (!shouldReturnFocusAfterClose) e.preventDefault();
          }}
        >
          <ModalWrapper
            closeAriaLabel={closeAriaLabel}
            modalHasHeader={modalHasHeader}
            title={title}
            onRequestClose={onRequestClose}
            footerContent={footerContent}
            onAfterOpen={onAfterOpen}
          >
            {children}
          </ModalWrapper>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ModalWrapper({
  modalHasHeader,
  title,
  onRequestClose,
  closeAriaLabel,
  children,
  footerContent,
  onAfterOpen,
}: {
  modalHasHeader: boolean;
  title: string;
  onRequestClose: () => void;
  closeAriaLabel: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
  onAfterOpen?: () => void;
}) {
  const theme = useTheme();
  useScrollLock();

  useEffect(() => {
    onAfterOpen?.();
  }, []);

  return (
    <>
      {modalHasHeader && (
        <ModalHeader hasCloseButton={Boolean(onRequestClose)}>
          {title ? (
            <Heading2 id="modal-title" mb="none">
              {title}
            </Heading2>
          ) : (
            <div style={{ height: theme.space.x4 }} />
          )}
          {onRequestClose && <ModalCloseButton onClick={onRequestClose} aria-label={closeAriaLabel} />}
        </ModalHeader>
      )}
      <ModalContent hasFooter={!!footerContent}>{children}</ModalContent>
      {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
    </>
  );
}

Modal.setAppElement = (_appElement?: string | HTMLElement) => {
  console.warn(
    "[NDS] Modal.setAppElement() is deprecated and has no effect. " +
      "The Modal component now uses @radix-ui/react-dialog, which handles aria-modal automatically."
  );
};

export default Modal;
