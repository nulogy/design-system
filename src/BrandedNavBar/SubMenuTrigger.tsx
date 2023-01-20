import React from "react";
import styled from "styled-components";
import { addStyledProps } from "../StyledProps";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";
import SubMenuTriggerButton from "./SubMenuTriggerButton";
import { TriggerFunctionProps } from "./TriggerFunctionProps";
import type { MenuType } from "./MenuTrigger";
import { NAVBAR_HEIGHT } from "./NavBar";

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen?: boolean;
  onItemClick?: any;
  menuData: any[];
  trigger: (props: TriggerFunctionProps) => React.ReactNode;
  layer: number;
  menuType: MenuType;
};

const SubMenuTrigger = ({ menuData, name, onItemClick, trigger, layer, menuType, ...props }: SubMenuTriggerProps) => {
  return (
    // @ts-ignore
    <NavBarDropdownMenu
      placement={getPlacement(menuType)}
      modifiers={{
        preventOverflow: {
          enabled: true,
          padding: 8,
          boundariesElement: "viewport",
        },
      }}
      showArrow={true}
      triggerTogglesMenuState={false}
      {...props}
      dropdownMenuContainerEventHandlers={({ openMenu, closeMenu }) => ({
        onMouseEnter: openMenu,
        onMouseLeave: closeMenu,
      })}
      trigger={({ closeMenu, openMenu, isOpen }) => {
        const defaultRender = () => (
          <SubMenuTriggerButton isOpen={isOpen} name={name} onMouseEnter={openMenu} onMouseLeave={closeMenu} />
        );
        const triggerProps: TriggerFunctionProps = {
          size: "medium",
          closeMenu,
          openMenu,
          isOpen,
          defaultRender,
          layer,
        };
        return trigger ? trigger(triggerProps) : defaultRender();
      }}
    >
      <SubMenuItemsList>
        {renderSubMenuItems(menuData, onItemClick, SubMenuTrigger, layer + 1, menuType)}
      </SubMenuItemsList>
    </NavBarDropdownMenu>
  );
};

const SubMenuItemsList = styled("ul")(
  () => ({
    listStyle: "none",
    margin: "0",
    padding: "0",
    maxHeight: `calc(100vh - ${NAVBAR_HEIGHT} - 20px)`,
    overflowY: "auto",
  }),
  addStyledProps
);

function getPlacement(menuType) {
  switch (menuType) {
    case "primary":
      return "right-start";
    case "secondary":
      return "left-start";
  }
}

export default SubMenuTrigger;
