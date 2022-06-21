import React from "react";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";
import SubMenuTriggerButton from "./SubMenuTriggerButton";

type SubMenuTriggerButtonProps = {
  name?: string;
  isOpen?: boolean;
  closeMenu?: any;
  openMenu?: any;
};

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen?: boolean;
  onItemClick?: any;
  menuData: any[];
  trigger: (props: SubMenuTriggerButtonProps) => JSX.Element;
};

const SubMenuTrigger = ({
  menuData,
  name,
  onItemClick,
  trigger,
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
      trigger={
        trigger
          ? ({ closeMenu, openMenu, isOpen }) =>
              trigger({ closeMenu, openMenu, isOpen, name })
          : ({ closeMenu, openMenu, isOpen }) => (
              <SubMenuTriggerButton
                isOpen={isOpen}
                name={name}
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              />
            )
      }
    >
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {renderSubMenuItems(menuData, onItemClick, SubMenuTrigger)}
      </ul>
    </NavBarDropdownMenu>
  );
};

SubMenuTrigger.displayName = "SubMenuTrigger";

export default SubMenuTrigger;
