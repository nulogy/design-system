import React from "react";
import styled from "styled-components";
import type { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";
import { NavigationMenuLink as BaseNavigationMenuLink } from "./components";

const NavigationMenuLink = styled(BaseNavigationMenuLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.space.x1,
}));

interface NavigationLogoLinkProps extends Omit<NavigationMenuLinkProps, "asChild"> {
  renderAsFragment?: boolean;
}

export const NavigationLogoLink = ({ href, renderAsFragment = false, ...props }: NavigationLogoLinkProps) => {
  return <NavigationMenuLink href={href} asChild={renderAsFragment} {...props} />;
};
