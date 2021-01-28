import React, { useEffect, useState, useRef, RefObject } from "react";
import {AnimatePresence} from "framer-motion";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { IconicButton } from "../Button";
import { Heading3 } from "../Type";
import { AnimatedBoxProps, AnimatedBox } from "../Box/Box";
import { NAVBAR_HEIGHT } from "../BrandedNavBar/NavBar";
import { useTranslation } from "react-i18next";
import { DetectOutsideClick } from "../utils";

type SidebarProps = AnimatedBoxProps & {
  children?: React.ReactNode;
  onClose?: (arg: any) => any;
  title?: string;
  isOpen?: boolean;
  footer?: React.ReactNode;
  closeButtonTestId?: string;
  closeButtonAriaLabel?: string;
  offset?: string;
  triggerRef?: RefObject<any>;
  duration?: number;
  closeOnOutsideClick?: boolean;
  overlay?: boolean
};

const focusFirstElement = () => {
  const FOCUSABLE_EL_SELECTOR = "button, a[href], select, textarea, input, [tabindex]:not([tabindex='-1'])";
  const focusable = document.querySelectorAll(FOCUSABLE_EL_SELECTOR);
  if (focusable && focusable[0]) {
    (focusable[0] as HTMLElement).focus();
  }
}

const SidebarOverlay = ({transitionDuration}) => (
    <AnimatedBox
      position="absolute"
      top="0"
      bottom="0"
      left="0"
      right="0"
      zIndex={"799" as any}
      bg="rgba(18, 43, 71, 0.5)"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: transitionDuration}}
    />
)

const Sidebar = ({
  p = "x3",
  width = "400px",
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
  closeOnOutsideClick,
  overlay = true,
  ...props
}: SidebarProps) => {
  const closeButton = useRef(null);
  const [shouldUpdateFocus, setShouldUpdateFocus] = useState(false);
  const { t } = useTranslation();
  const sideBarRef = useRef(null);

  useEffect(() => {
    if (closeButton.current && isOpen) {
      if (closeButton && closeButton.current) {
        closeButton.current.focus();
        setShouldUpdateFocus(true);
        return;
      }
    } else if (shouldUpdateFocus) {
      if (triggerRef) {
        triggerRef.current.focus();
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
    {overlay && (
      <AnimatePresence>
        {isOpen && (<SidebarOverlay transitionDuration={duration} />) }
      </AnimatePresence>
    )}
    <AnimatedBox
      role="complementary"
      bg="white"
      display="flex"
      flexDirection="column"
      height="100%"
      boxShadow="large"
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="lightGrey"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      initial={isOpen ? "open" : "closed"}
      position="fixed"
      top={NAVBAR_HEIGHT}
      right={offset}
      width={typeof width === 'string' ? { default: "100%", small: width } : width}
      zIndex={"sidebar" as any}
      ref={sideBarRef as any}
      {...props}
    >
      <Flex
        p={p}
        maxHeight="100%"
        overflow="auto"
        flexGrow={1}
        flexDirection="column"
        style={{ overflowBehaviour: "contain" } as any}
      >
      <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>{title && <Heading3>{title}</Heading3>}</Box>
          <Box><IconicButton ref={closeButton} icon="close" onClick={onClose} data-testid={closeButtonTestId} aria-label={closeButtonAriaLabel || t("close")}/></Box>
        </Flex>
        <AnimatedBox variants={childVariants} animate={isOpen ? "open" : "closed"} flexGrow={1}>
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
      {closeOnOutsideClick && isOpen && <DetectOutsideClick onClick={onClose} clickRef={sideBarRef} />}
    </AnimatedBox>
  </>
  );
};

export default Sidebar;

