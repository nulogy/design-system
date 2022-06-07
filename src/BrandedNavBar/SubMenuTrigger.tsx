import React from "react";
import styled, {
  CSSObject,
  StyledComponentPropsWithRef,
} from "styled-components";
import { Icon } from "../Icon";
import { DropdownButton } from "../DropdownMenu/index";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen?: boolean;
  onItemClick?: any;
  menuData: any[];
};

const StyledButton: StyledComponentPropsWithRef<any> = styled(DropdownButton)(
  ({ isOpen, theme }: any): CSSObject => ({
    position: "relative",
    backgroundColor: isOpen ? theme.colors.lightBlue : "transparent",
    color: isOpen ? theme.colors.darkBlue : theme.colors.darkGrey,
  })
);
type SubMenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen: boolean;
};

const SubMenuTriggerButton = React.forwardRef<
  HTMLButtonElement,
  SubMenuTriggerButtonProps
>(({ name, isOpen, ...props }, ref) => (
  <StyledButton isOpen={isOpen} ref={ref} {...props}>
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
