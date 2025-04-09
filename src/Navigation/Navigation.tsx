import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";
import { MenuItems } from "./components/NavigationMenuItem";
import { UserMenu } from "./types";
import { AppSwitcherConfig } from "./components/AppSwitcher/NulogyAppSwitcher";

export interface NavigationProps {
  breakpoint?: string;
  appSwitcher?: AppSwitcherConfig;
  secondaryLogo?: React.ReactNode;
  primaryNavigation?: MenuItems;
  secondaryNavigation?: MenuItems;
  userMenu?: UserMenu;
}

const Navigation = ({ breakpoint = "1024px", ...props }: NavigationProps) => {
  const lg = useMediaQuery(`(min-width: ${breakpoint})`);

  return <>{lg ? <DesktopNav {...props} /> : <MobileNav {...props} />}</>;
};

export default Navigation;
