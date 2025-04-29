import React from "react";
import Logo from "../../icons/Logo";
import { NavigationMenuLink } from "./components";

interface NulogyLogoProps {
  url: string;
}

export function NulogyLogo({ url }: NulogyLogoProps) {
  return (
    <NavigationMenuLink href={url} p="x1" display="flex" alignItems="center">
      <Logo />
    </NavigationMenuLink>
  );
}
