import { DialogContent } from "@reach/dialog";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "../../Flex";
import { Icon } from "../../Icon";
import { MenuButton, Overlay, MenuItemList } from "../TopBar.styled";

const blurVariants = {
  hidden: {
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
  },
  visible: {
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Menu({
  children,
  defaultOpened = false,
  ...props
}: {
  defaultOpened?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const [showMenu, setShowMenu] = React.useState(defaultOpened);
  const [animationComplete, setAnimationComplete] = React.useState(false);
  const { t } = useTranslation();

  function close() {
    setShowMenu(false);
    setAnimationComplete(false);
  }

  function toggle() {
    if (!showMenu) {
      setAnimationComplete(false);
    }
    setShowMenu((s) => !s);
  }

  return (
    <Flex justifyContent="flex-end" as="li" color="black" flex="1 1">
      <MenuButton onClick={toggle} data-testid="topbar-menu-button">
        <Icon size="x3" color="midGrey" icon={showMenu ? "close" : "apps"} />
      </MenuButton>
      <AnimatePresence>
        {showMenu && (
          <Overlay
            data-testid="topbar-menu-overlay"
            data-visible={animationComplete ? "true" : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={blurVariants}
            isOpen={showMenu}
            onAnimationComplete={() => {
              if (showMenu) {
                setAnimationComplete(true);
              }
            }}
            onDismiss={close}
          >
            <DialogContent
              data-testid="topbar-menu"
              data-visible={animationComplete ? true : undefined}
              aria-label={props["aria-label"] ?? t("menu options")}
            >
              <MenuItemList>{children}</MenuItemList>
            </DialogContent>
          </Overlay>
        )}
      </AnimatePresence>
    </Flex>
  );
}
