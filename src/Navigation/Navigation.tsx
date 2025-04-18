import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";
import type { MenuItems, UserMenu } from "./types";
import { AppSwitcherConfig } from "./components/AppSwitcher/NulogyAppSwitcher";

export interface BaseNavigationProps {
  appSwitcher?: AppSwitcherConfig;
  secondaryLogo?: React.ReactNode;
  primaryAppUrl?: string;
  primaryNavigation?: MenuItems;
  secondaryNavigation?: MenuItems;
  userMenu?: UserMenu;
}

export interface NavigationProps extends BaseNavigationProps {
  breakpoint?: string;
}

const Navigation = ({ breakpoint = "1024px", ...props }: NavigationProps) => {
  const lg = useMediaQuery(`(min-width: ${breakpoint})`);

  return <>{lg ? <DesktopNav {...props} /> : <MobileNav {...props} />}</>;
};

export default Navigation;
