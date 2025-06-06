import React, { useEffect, useState, useRef, RefObject, CSSProperties } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { ZIndexProps } from "styled-system";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { IconicButton } from "../Button";
import { Heading2, Text } from "../Type";
import { AnimatedBoxProps, AnimatedBox } from "../Box/Box";
import { NAVBAR_HEIGHT } from "../BrandedNavBar/NavBar";
import { useScrollLock } from "../utils/useScrollLock";
import { useFeatureFlags } from "../NDSProvider/FeatureFlagsContext";
import { NAVIGATION_MENU_HEIGHT_STYLED_UNITS } from "../Navigation/components/shared/constants";

type PredefinedSidebarWidth = "xs" | "s" | "m" | "l" | "xl";

// We need (string & {}) to allow passing
// custom values in addition to the predefined width
// https://twitter.com/mattpocockuk/status/1671908303918473217
// eslint-disable-next-line @typescript-eslint/ban-types
type SidebarWidth = PredefinedSidebarWidth | (string & {});

const sidebarWidths: Record<PredefinedSidebarWidth, CSSProperties["width"]> = {
  xs: "400px",
  s: "520px",
  m: "640px",
  l: "768px",
  xl: "1024px",
} as const;

export type SidebarProps = Omit<AnimatedBoxProps, "width"> & {
  children?: React.ReactNode;
  onClose?: () => void;
  title?: string;
  isOpen?: boolean;
  footer?: React.ReactNode;
  closeButtonTestId?: string;
  closeButtonAriaLabel?: string;
  offset?: string;
  triggerRef?: RefObject<HTMLInputElement | HTMLButtonElement>;
  duration?: number;
  closeOnOutsideClick?: boolean;
  overlay?: boolean | "show" | "hide" | "transparent";
  disableScroll?: boolean;
  hideCloseButton?: boolean;
  width?: SidebarWidth;
  helpText?: React.ReactNode;
  renderHelpText?: () => React.ReactNode;
};

const focusFirstElement = () => {
  const FOCUSABLE_EL_SELECTOR = "button, a[href], select, textarea, input, [tabindex]:not([tabindex='-1'])";
  const focusable = document.querySelectorAll(FOCUSABLE_EL_SELECTOR);
  if (focusable && focusable[0]) {
    (focusable[0] as HTMLElement).focus();
  }
};

const SidebarOverlay = ({ transitionDuration, top, transparent, zIndex = 799 as any, onClick }) => (
  <AnimatedBox
    position="fixed"
    top={top}
    bottom="0"
    left="0"
    right="0"
    zIndex={zIndex}
    bg={!transparent && "rgba(18, 43, 71, 0.5)"}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: transitionDuration }}
    data-testid="sidebar-overlay"
    onMouseDown={onClick}
  />
);
function Sidebar({
  p = "x2",
  width = "xs",
  children,
  onClose,
  title,
  isOpen,
  footer,
  closeButtonTestId = "sidebar-close-button",
  closeButtonAriaLabel,
  offset = "0px",
  triggerRef,
  duration = 0.25,
  top,
  closeOnOutsideClick = true,
  overlay = "show",
  disableScroll = true,
  hideCloseButton = false,
  zIndex = "sidebar" as ZIndexProps["zIndex"],
  helpText,
  renderHelpText,
  ...props
}: SidebarProps) {
  const closeButton = useRef(null);
  const [shouldUpdateFocus, setShouldUpdateFocus] = useState(false);
  const { t } = useTranslation();
  const sideBarRef = useRef(null);
  const contentRef = useRef(null);
  const selectedWidth = sidebarWidths[width] ?? width;

  const { navigationV3 } = useFeatureFlags();
  const theme = useTheme();

  top ||= navigationV3 ? theme.space[NAVIGATION_MENU_HEIGHT_STYLED_UNITS] : NAVBAR_HEIGHT;

  useScrollLock({
    autoLock: overlay && disableScroll && isOpen,
  });

  useEffect(() => {
    if (closeButton.current && isOpen) {
      if (closeButton && closeButton.current) {
        closeButton.current.focus();
        setShouldUpdateFocus(true);
        return;
      }
    } else if (shouldUpdateFocus) {
      if (triggerRef) {
        triggerRef?.current?.focus();
      } else {
        focusFirstElement();
      }
    }
  }, [isOpen, setShouldUpdateFocus]);

  const variants = {
    open: {
      x: 0,
      right: offset,
      visiblility: "visible",
      transition: {
        duration: duration,
        when: "beforeChildren",
      },
    },
    closed: {
      x: "100%",
      right: "0px",
      visiblility: "hidden",
      transition: {
        duration: duration,
      },
    },
  };

  const childVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {closeOnOutsideClick && (
        <AnimatePresence>
          {isOpen && overlay !== "hide" && (
            <SidebarOverlay
              top={top}
              transparent={overlay === "transparent" || overlay === false}
              transitionDuration={duration}
              zIndex={zIndex}
              onClick={closeOnOutsideClick && isOpen && onClose}
            />
          )}
        </AnimatePresence>
      )}
      <AnimatedBox
        role="dialog"
        paddingX="x1"
        bg="white"
        display="flex"
        flexDirection="column"
        height={`calc(100% - ${navigationV3 ? theme.space[NAVIGATION_MENU_HEIGHT_STYLED_UNITS] : NAVBAR_HEIGHT})`}
        borderLeftWidth="1px"
        borderLeftStyle="solid"
        borderLeftColor="lightGrey"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        initial={isOpen ? "open" : "closed"}
        position="fixed"
        top={top}
        right={offset}
        width={typeof selectedWidth === "string" ? { default: "100%", small: selectedWidth } : selectedWidth}
        zIndex={zIndex}
        ref={sideBarRef as any}
        {...props}
      >
        <Flex
          flexDirection="column"
          p="x2"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="lightGrey"
        >
          <Flex flexDirection="column" gap="x1">
            <Flex justifyContent="space-between" alignItems="flex-start">
              {title && (
                <Flex alignItems="center" height="100%">
                  <Heading2 mb={0}>{title}</Heading2>
                </Flex>
              )}
              {!hideCloseButton && (
                <Box marginLeft="x2">
                  <IconicButton
                    type="button"
                    ref={closeButton}
                    icon="close"
                    onClick={onClose}
                    data-testid={closeButtonTestId}
                    aria-label={closeButtonAriaLabel || t("close")}
                  />
                </Box>
              )}
            </Flex>
            {renderHelpText ? renderHelpText() : helpText && <Text color="midGrey">{helpText}</Text>}
          </Flex>
        </Flex>
        <Flex
          p={p}
          maxHeight="100%"
          overflow="auto"
          flexGrow={1}
          flexDirection="column"
          style={{ overflowBehaviour: "contain" } as CSSProperties}
        >
          <AnimatedBox variants={childVariants} animate={isOpen ? "open" : "closed"} flexGrow={1} ref={contentRef}>
            {children}
          </AnimatedBox>
        </Flex>
        {footer && (
          <Box
            position="sticky"
            backgroundColor="white"
            borderTopWidth="1px"
            borderTopStyle="solid"
            borderTopColor="lightGrey"
            alignSelf="flex-end"
            width="100%"
            p={p}
            pt="x2"
          >
            {footer}
          </Box>
        )}
      </AnimatedBox>
    </>
  );
}

export default Sidebar;
