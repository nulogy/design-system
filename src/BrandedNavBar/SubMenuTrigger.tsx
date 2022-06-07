import React from "react";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { Icon } from "../Icon";
import { DropdownButton } from "../DropdownMenu/index";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  onItemClick?: any;
  menuData: any[];
};

const StyledButton: StyledComponentPropsWithRef<any> = styled(DropdownButton)({
  position: "relative",
});

type SubMenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
};

const SubMenuTriggerButton = React.forwardRef<
  HTMLButtonElement,
  SubMenuTriggerButtonProps
>(({ name, ...props }, ref) => (
  <StyledButton ref={ref} {...props}>
    {name}
    <Icon
      style={{ position: "absolute", top: "10px" }}
      icon="rightArrow"
      size="20px"
      p="2px"
    />
  </StyledButton>
));

SubMenuTriggerButton.displayName = "SubMenuTriggerButton";

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
      trigger={({ closeMenu, openMenu }) => (
        <SubMenuTriggerButton
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
