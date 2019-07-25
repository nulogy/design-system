import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Icon } from "../Icon";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import renderSubMenuItems from "./renderSubMenuItems";

const StyledButton = styled.button({
  display: "block",
  position: "relative",
  color: theme.colors.darkBlue,
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  width: "100%",
  padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
  "&:hover": {
    backgroundColor: theme.colors.lightGrey
  },
  "&:disabled": {
    opacity: ".5"
  },
  "&:focus": {
    outline: "none",
    boxShadow: theme.shadows.focus
  },
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  textAlign: "left",
  cursor: "pointer"
});

const SubMenuTriggerButton = React.forwardRef(({ name, ...props }, ref) => (
  <StyledButton ref={ref} {...props}>
    {name}
    <Icon style={{ position: "absolute", top: "11px" }} icon="rightArrow" color="darkBlue" size="20px" p="2px" />
  </StyledButton>
));

SubMenuTriggerButton.propTypes = {
  name: PropTypes.string.isRequired
};

const SubMenuTrigger = props => {
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
        onMouseLeave: closeMenu
      })}
      trigger={({ closeMenu, openMenu }) => (
        <SubMenuTriggerButton name={name} onMouseEnter={openMenu} onMouseLeave={closeMenu} />
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
  onItemClick: PropTypes.func
};

SubMenuTrigger.defaultProps = {
  menuData: null,
  onItemClick: null
};

export default SubMenuTrigger;
