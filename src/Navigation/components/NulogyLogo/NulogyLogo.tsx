import React from "react";
import { Flex } from "../../../Flex";
import { Text } from "../../../Type";
import { APP_DISPLAY_NAMES } from "../../../types/NulogyApp";
import type { NulogyAppName } from "../../../types/NulogyApp";
import { SvgNulogyLogo } from "./SvgNulogyLogo";

export interface NulogyLogoProps {
  app?: NulogyAppName;
}

export function NulogyLogo({ app }: NulogyLogoProps) {
  const appDisplayName = APP_DISPLAY_NAMES[app];

  if (app && !(app in APP_DISPLAY_NAMES)) {
    throw new Error(`Invalid app name: ${app}. Valid names are: ${Object.keys(APP_DISPLAY_NAMES).join(", ")}`);
  }

  return (
    <Flex alignItems="flex-start" justifyContent="center" flexDirection={appDisplayName ? "column" : "row"}>
      <SvgNulogyLogo width="102" height="24" />
      {appDisplayName && (
        /*
        This Text component is using custom properties that are not 
        in the theme because we're trying to match the branding 
        typography and colors of the Nulogy logo.
        */
        <Text
          fontSize="10px"
          lineHeight="12px"
          color="#1C68A5"
          fontWeight="normal"
          textTransform="uppercase"
          letterSpacing="0.4px"
        >
          {appDisplayName}
        </Text>
      )}
    </Flex>
  );
}
