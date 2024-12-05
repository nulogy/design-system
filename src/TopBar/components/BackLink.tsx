import React, { ComponentProps } from "react";
import { MaxWidthProps } from "styled-system";
import { Box } from "../../Box";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Icon } from "../../Icon";
import { Text } from "../../Type";
import { StyledBackLink } from "../TopBar.styled";

const BACK_LINK_MAX_WIDTH: MaxWidthProps["maxWidth"] = {
  phoneLandscape: "20ch",
  tabletPortrait: "18ch",
  tabletLandscape: "20ch",
  laptop: "24ch",
};

interface BackLinkProps extends MaxWidthProps, ComponentProps<typeof StyledBackLink> {}

export function BackLink({ children, maxWidth = BACK_LINK_MAX_WIDTH, ...props }: BackLinkProps) {
  const md = useMediaQuery("phoneLandscape");

  return (
    <Box as="li" flex="1 1">
      <StyledBackLink {...props} data-testid="topbar-back-link">
        <Icon icon="arrowBack" />
        {md && (
          <Text maxWidth={maxWidth} textOverflow="ellipsis" overflow="hidden" fontSize="small">
            {children}
          </Text>
        )}
      </StyledBackLink>
    </Box>
  );
}
