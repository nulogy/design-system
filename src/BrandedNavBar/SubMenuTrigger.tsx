import React from "react";
import styled, { CSSObject, StyledComponentPropsWithRef } from "styled-components";
import theme from "../theme";
import { Icon } from "../Icon";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";

type SubMenuTriggerProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen?: boolean;
  onItemClick?: any;
  menuData: any[];
};

const StyledButton: StyledComponentPropsWithRef<any> = styled.button(
  ({ isOpen }: any): CSSObject => ({
    display: "block",
    position: "relative",
    color: theme.colors.darkBlue,
    fontSize: theme.fontSizes.small,
    lineHeight: theme.lineHeights.smallTextBase,
    width: "100%",
    padding: `${theme.space.half} 28px ${theme.space.half} 12px`,
    border: "none",
    borderLeft: `${theme.space.half} solid transparent`,
    "&:hover": {
      backgroundColor: theme.colors.lightGrey,
    },
    "&:disabled": {
      opacity: ".5",
    },
    "&:focus": {
      outline: "none",
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.lightGrey,
      borderLeft: `${theme.space.half}  solid ${theme.colors.blue}`,
    },
    backgroundColor: isOpen ? theme.colors.lightGrey : "transparent",
    textDecoration: "none",
    textAlign: "left",
    cursor: "pointer",
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
      style={{ position: "absolute", top: "7px" }}
      icon="rightArrow"
      color="darkBlue"
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

SubMenuTrigger.displayName = "SubMenuTriggerButton";

export default SubMenuTrigger;
