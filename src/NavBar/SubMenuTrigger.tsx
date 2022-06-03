import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Icon } from "../Icon";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";

const StyledButton = styled.button<{ isOpen: boolean }>(({ isOpen }) => ({
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
}));

type SubMenuTriggerButtonProps = {
  name: string;
  isOpen: boolean;
  onMouseEnter: any;
  onMouseLeave: any;
};

const SubMenuTriggerButton = React.forwardRef<any, SubMenuTriggerButtonProps>(
  ({ name, isOpen, ...props }, ref) => (
    <StyledButton isOpen={isOpen} ref={ref} {...props}>
      <>
        {name}
        <Icon
          style={{ position: "absolute", top: "7px" }}
          icon="rightArrow"
          color="darkBlue"
          size="20px"
          p="2px"
        />
      </>
    </StyledButton>
  )
);

SubMenuTriggerButton.propTypes = {
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

SubMenuTriggerButton.defaultProps = {
  isOpen: false,
};

const SubMenuTrigger = (props) => {
  const { menuData, name, onItemClick, ...otherProps } = props;
  return (
    <NavBarDropdownMenu
      placement="right-start"
      modifiers={null}
      showArrow={false}
      triggerTogglesMenuState={false}
      {...otherProps}
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

SubMenuTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  onItemClick: PropTypes.func,
};

SubMenuTrigger.defaultProps = {
  menuData: null,
  onItemClick: null,
};

export default SubMenuTrigger;
