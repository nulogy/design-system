import React, { ComponentProps } from "react";
import { useTheme } from "styled-components";
import { MaxWidthProps } from "styled-system";
import { Box } from "../../Box";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Text } from "../../Type";
import { StyledBackButton } from "../TopBar.styled";

const BACK_BUTTON_MAX_WIDTH: MaxWidthProps["maxWidth"] = {
  phoneLandscape: "20ch",
  tabletPortrait: "18ch",
  tabletLandscape: "20ch",
  laptop: "24ch",
};

interface BackButtonProps extends MaxWidthProps, ComponentProps<typeof StyledBackButton> {}

export function BackButton({ children, maxWidth = BACK_BUTTON_MAX_WIDTH, ...props }: BackButtonProps) {
  const md = useMediaQuery("phoneLandscape");

  return (
    <Box as="li" flex="1 1">
      <StyledBackButton {...props}>
        <BackButtonIcon />
        {md && (
          <Text maxWidth={maxWidth} textOverflow="ellipsis" overflow="hidden" fontSize="small">
            {children}
          </Text>
        )}
      </StyledBackButton>
    </Box>
  );
}

// Export to NDS Icons
function BackButtonIcon() {
  const theme = useTheme();
  return (
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
}
