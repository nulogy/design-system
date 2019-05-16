import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Icon } from "../Icon";
import { DropdownMenu } from "../DropdownMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import renderSubMenuItems from "./renderSubMenuItems";

const StyledButton = styled.button({
  display: "block",
  position: "relative",
  color: theme.colors.white,
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.lightBlue,
    backgroundColor: theme.colors.black,
    cursor: "pointer"
  },
  "&:disabled": {
    opacity: ".5"
  }
});

const MenuTriggerButton = React.forwardRef(({ name, ...props }, ref) => (
  <StyledButton ref={ref} {...props}>
    {name}
    <Icon style={{ position: "absolute", top: "11px" }} icon="downArrow" color="lightGrey" size="20px" p="2px" />
  </StyledButton>
));

MenuTriggerButton.propTypes = {
  name: PropTypes.string.isRequired
};

const MenuTrigger = props => {
  const { menuData, name, ...otherProps } = props;
  return (
    <DropdownMenu {...otherProps} trigger={() => <MenuTriggerButton name={name} />}>
      {({ closeMenu }) => (
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {renderSubMenuItems(menuData, closeMenu, SubMenuTrigger)}
        </ul>
      )}
    </DropdownMenu>
  );
};

MenuTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(PropTypes.shape({}))
};

MenuTrigger.defaultProps = {
  menuData: null
};

export default MenuTrigger;
