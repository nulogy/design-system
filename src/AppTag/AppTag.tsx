import React from "react";
import styled, { useTheme } from "styled-components";
import { Text } from "../Type";
import { LogoWrapper } from "./components/LogoWrapper";
import NulogyLogo from "./components/NulogyLogo";
import { Tooltip } from "./components/Tooltip";
import type { AppName } from "./constants";
import { APP_ABBREVIATIONS, APP_DISPLAY_NAMES, appTagColors } from "./constants";
import { AppTagType } from "./types";

type AppTagProps = {
  app: AppName;
  type?: AppTagType;
  hideTooltip?: boolean;
};

export default function AppTag({ app, type = "active", hideTooltip = false }: AppTagProps) {
  const theme = useTheme();
  const abbreviation = APP_ABBREVIATIONS[app];
  const displayName = APP_DISPLAY_NAMES[app];

  return (
    <Tooltip content={displayName} hideTooltip={hideTooltip}>
      <Wrapper $type={type}>
        <LogoWrapper $type={type}>
          <NulogyLogo width={8} height={8} />
        </LogoWrapper>
        <Text
          fontSize="smaller"
          fontWeight="bold"
          color={theme.colors[appTagColors[type].primary]}
          px="x0_75"
          pl="x0_5"
          lineHeight="smallerText"
          letterSpacing=".05em"
        >
          {abbreviation}
        </Text>
      </Wrapper>
    </Tooltip>
  );
}

const Wrapper = styled.span<{ $type?: AppTagType }>(({ theme, $type }) => {
  const color = theme.colors[appTagColors[$type].secondary];

  return {
    margin: theme.space.none,
    paddingTop: theme.space.none,
    paddingBottom: theme.space.none,
    fontSize: theme.fontSizes.smaller,
    lineHeight: theme.lineHeights.smallerText,
    alignSelf: "center",
    display: "inline-flex",
    fontWeight: theme.fontWeights.bold,
    userSelect: "none",
    boxShadow: `inset 0 0 0 1px ${color}`,
    borderRadius: theme.radii.rounded,
    backgroundColor: theme.colors.white,
    transition: "background-color 0.3s ease-in-out",

    "&:hover, a:hover &": {
      backgroundColor: color,
    },
  };
});
