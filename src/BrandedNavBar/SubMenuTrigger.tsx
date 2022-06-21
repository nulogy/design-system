import React from "react";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";
import SubMenuTriggerButton from "./SubMenuTriggerButton";
import { TriggerFunctionProps } from "./TriggerFunctionProps";

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen?: boolean;
  onItemClick?: any;
  menuData: any[];
  trigger: (props: TriggerFunctionProps) => React.ReactNode;
  layer: number;
};

const SubMenuTrigger = ({
  menuData,
  name,
  onItemClick,
  trigger,
  layer,
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
      trigger={({ closeMenu, openMenu, isOpen }) => {
        const defaultRender = () => (
          <SubMenuTriggerButton
            isOpen={isOpen}
            name={name}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          />
        );
        const triggerProps: TriggerFunctionProps = {
          mode: "desktop",
          closeMenu,
          openMenu,
          isOpen,
          defaultRender,
          layer,
        };
        return trigger ? trigger(triggerProps) : defaultRender();
      }}
    >
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {renderSubMenuItems(menuData, onItemClick, SubMenuTrigger, layer + 1)}
      </ul>
    </NavBarDropdownMenu>
  );
};

SubMenuTrigger.displayName = "SubMenuTrigger";

export default SubMenuTrigger;
