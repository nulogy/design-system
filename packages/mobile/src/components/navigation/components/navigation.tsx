import type { MenuItems } from "./menu-item"
import useMediaQuery from "../../../hooks/useMediaQuery"
import DesktopNavigation from "./desktop-navigation"
import MobileNavigation from "./mobile-navigation"

const Navigation = ({ menuItems, appSwitcher }: { menuItems: MenuItems; appSwitcher: React.ReactNode }) => {
  const lg = useMediaQuery(`(min-width: 1024px)`)

  return (
    <>
      {lg ? (
        <DesktopNavigation appSwitcher={appSwitcher} primaryMenu={menuItems} />
      ) : (
        <MobileNavigation appSwitcher={appSwitcher} primaryMenu={menuItems} />
      )}
    </>
  )
}

export default Navigation
