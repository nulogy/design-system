import React from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { MenuItems } from "./NavigationMenuItem";

interface Props {
  primaryMenu: MenuItems;
  breakpoint?: string;
}

const Nav = ({ primaryMenu, breakpoint = "1024px" }: Props) => {
  const lg = useMediaQuery(`(min-width: ${breakpoint})`);

  return <>{lg ? <DesktopNav primaryMenu={primaryMenu} /> : <MobileNav primaryMenu={primaryMenu} />}</>;
};

export default Nav;
