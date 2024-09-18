import React from "react"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import { type MenuItems } from "./NavigationMenuItem"
import useMediaQuery from "../../hooks/useMediaQuery"

const Nav = ({ menuItems }: { menuItems: MenuItems }) => {
  const lg = useMediaQuery(`(min-width: 1024px)`)

  return <>{lg ? <DesktopNav primaryMenu={menuItems} /> : <MobileNav primaryMenu={menuItems} />}</>
}

export default Nav
