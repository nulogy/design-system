import { IconName } from "@nulogy/icons";
import { DialogContent } from "@reach/dialog";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { useTheme } from "styled-components";
import { Box } from "../Box";
import { Flex } from "../Flex";
import useMediaQuery from "../hooks/useMediaQuery";
import { Icon } from "../Icon";
import { Heading3, Text } from "../Type";
import {
  Navigation,
  Overlay,
  Header,
  NavigationItemsList,
  BackButton,
  CurrentPageItem,
  TileLink,
  StylelessButton,
} from "./TopBar.styled";

const blurVariants = {
  hidden: {
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)", // For Safari support
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

export interface TopBarProps {
  previousPageTitle: string;
  currentPageTitle: string;
}

const MotionHeading = motion(Heading3);
const MotionText = motion(Text);

export default function TopBar({ previousPageTitle, currentPageTitle }: TopBarProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const md = useMediaQuery("phoneLandscape");
  const theme = useTheme();

  function close() {
    setShowMenu(false);
  }

  const backIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={theme.sizes.x3}
      width={theme.sizes.x3}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
    </svg>
  );

  return (
    <Header>
      <Navigation>
        <NavigationItemsList>
          <Box as="li" flex="1 1">
            <BackButton>
              {backIcon}
              {md && <Text fontSize="md">{previousPageTitle}</Text>}
            </BackButton>
          </Box>

          <CurrentPageItem>{currentPageTitle}</CurrentPageItem>

          <Flex justifyContent="flex-end" as="li" color="black" flex="1 1">
            <StylelessButton>
              <Icon
                size="x3"
                icon={showMenu ? "close" : "apps"}
                onClick={() => {
                  setShowMenu((s) => !s);
                }}
              />
            </StylelessButton>
            <AnimatePresence>
              {showMenu && (
                <Overlay
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={blurVariants}
                  isOpen={showMenu}
                  onDismiss={close}
                >
                  <DialogContent>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: theme.space.x3,
                        margin: 0,
                      }}
                    >
                      <li>
                        <Tile
                          title="Home"
                          description="Go to the home page"
                          href="/primitives/docs/overview/introduction"
                        />
                      </li>
                    </ul>
                  </DialogContent>
                </Overlay>
              )}
            </AnimatePresence>
          </Flex>
        </NavigationItemsList>
      </Navigation>
    </Header>
  );
}

interface TileProps extends HTMLMotionProps<"a"> {
  description?: string;
  icon?: IconName;
}

function Tile({ description, title, icon: _, ...props }: TileProps) {
  const theme = useTheme();

  return (
    <TileLink
      initial={{ opacity: 0, width: "0", scale: 0 }}
      animate={{ opacity: 1, width: "auto", scale: 1 }}
      exit={{ opacity: 0, width: "0", scale: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={theme.sizes.x4}
        width={theme.sizes.x4}
        viewBox="0 -960 960 960"
        fill="currentColor"
      >
        <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
      </svg>
      <Flex flexDirection="column" justifyContent="center">
        <MotionHeading
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, ease: [0.32, 0.72, 0, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } }}
        >
          {title}
        </MotionHeading>
        <MotionText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, ease: [0.32, 0.72, 0, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } }}
          color="lightGrey"
        >
          {description}
        </MotionText>
      </Flex>
    </TileLink>
  );
}
