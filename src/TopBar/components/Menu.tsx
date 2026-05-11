import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "../../Flex";
import { Icon } from "../../Icon";
import { MenuButton, MenuItemList, Overlay } from "../TopBar.styled";

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
      ease: "easeInOut" as const,
    },
  },
  exit: {
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
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

  return (
    <Flex justifyContent="flex-end" as="li" color="black" flex="1 1">
      <Dialog.Root
        open={showMenu}
        onOpenChange={(open) => {
          if (!open) setAnimationComplete(false);
          setShowMenu(open);
        }}
      >
        <Dialog.Trigger asChild>
          <MenuButton data-testid="topbar-menu-button">
            <Icon size="x3" color="midGrey" icon={showMenu ? "close" : "apps"} />
          </MenuButton>
        </Dialog.Trigger>
        <AnimatePresence>
          {showMenu && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <Overlay
                  data-testid="topbar-menu-overlay"
                  data-visible={animationComplete ? "true" : undefined}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={blurVariants}
                  onAnimationComplete={() => {
                    if (showMenu) {
                      setAnimationComplete(true);
                    }
                  }}
                >
                  <Dialog.Content
                    data-testid="topbar-menu"
                    data-visible={animationComplete ? true : undefined}
                    aria-label={props["aria-label"] ?? t("menu options")}
                  >
                    <MenuItemList>{children}</MenuItemList>
                  </Dialog.Content>
                </Overlay>
              </Dialog.Overlay>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </Flex>
  );
}
