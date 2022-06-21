import React from "react";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";
import SubMenuTriggerButton from "./SubMenuTriggerButton";

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen?: boolean;
  onItemClick?: any;
  menuData: any[];
};

const SubMenuTrigger = ({
  menuData,
  name,
  onItemClick,
  ...props
}: SubMenuTriggerProps) => {
  return (
    // @ts-ignore
    <NavBarDropdownMenu
      placement="right-start"
      modifiers={null}
      showArrow={false}
      triggerTogglesMenuState={false}
      {...props}
      dropdownMenuContainerEventHandlers={({ openMenu, closeMenu }) => ({
        onMouseEnter: openMenu,
        onMouseLeave: closeMenu,
      })}
      trigger={({ closeMenu, openMenu, isOpen }) => (
        <SubMenuTriggerButton
          isOpen={isOpen}
          name={name}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        />
      )}
    >
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {renderSubMenuItems(menuData, onItemClick, SubMenuTrigger)}
      </ul>
    </NavBarDropdownMenu>
  );
};

SubMenuTrigger.displayName = "SubMenuTrigger";

export default SubMenuTrigger;
