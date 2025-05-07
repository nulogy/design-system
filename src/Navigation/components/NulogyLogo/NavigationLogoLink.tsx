import React from "react";
import type { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";
import { NavigationMenuLink } from "../shared/components";

interface NavigationLogoLinkProps extends Omit<NavigationMenuLinkProps, "asChild"> {
  renderAsFragment?: boolean;
}

export function NavigationLogoLink({ href, renderAsFragment = false, ...props }: NavigationLogoLinkProps) {
  return (
    <NavigationMenuLink display="flex" alignItems="center" p="x1" href={href} asChild={renderAsFragment} {...props} />
  );
}
