import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { MenuItems } from "./NavigationMenuItem";

const Nav = ({ menuItems }: { menuItems: MenuItems }) => {
  const lg = useMediaQuery(`(min-width: 1024px)`);

  return <>{lg ? <DesktopNav primaryMenu={menuItems} /> : <MobileNav primaryMenu={menuItems} />}</>;
};

export default Nav;
