import React from "react";
import { useTheme } from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";
import type { MenuItems, UserMenu } from "./types";
import { AppSwitcherConfig } from "./components/AppSwitcher/NulogyAppSwitcher";
import { NAVIGATION_DEFAULT_BREAKPOINT_THEME_KEY } from "./components/shared/constants";

export interface BaseNavigationProps {
  appSwitcher?: AppSwitcherConfig;
  primaryLogo?: React.ReactNode;
  secondaryLogo?: React.ReactNode;
  primaryNavigation?: MenuItems;
  secondaryNavigation?: MenuItems;
  userMenu?: UserMenu;
}

export interface NavigationProps extends BaseNavigationProps {
  breakpoint?: string;
}

const Navigation = ({ breakpoint = NAVIGATION_DEFAULT_BREAKPOINT_THEME_KEY, ...props }: NavigationProps) => {
  const theme = useTheme();

  const query = theme?.breakpoints?.[breakpoint] ? breakpoint : `(min-width: ${breakpoint})`;
  const largeScreen = useMediaQuery(query);

  return <>{largeScreen ? <DesktopNav {...props} /> : <MobileNav {...props} />}</>;
};

export default Navigation;
