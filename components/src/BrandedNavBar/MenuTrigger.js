import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "@styled-system/theme-get";
import { Icon } from "../Icon";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import renderSubMenuItems from "./renderSubMenuItems";

const StyledButton = styled.button(({ color, hoverColor, hoverBackground, theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  color: theme.colors[color] || color,
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  lineHeight: theme.lineHeights.base,
  transition: "background-color .2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors[hoverColor] || hoverColor,
    backgroundColor: theme.colors[hoverBackground] || hoverBackground,
    cursor: "pointer"
  },
  "&:focus": {
    boxShadow: theme.shadows.focus
  },
  "&:disabled": {
    opacity: ".5"
  }
}));

StyledButton.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

StyledButton.defaultProps = {
  color: "white",
  hoverColor: "lightBlue",
  hoverBackground: "black"
};

const MenuTriggerButton = React.forwardRef(({ name, color, hoverColor, hoverBackground, ...props }, ref) => (
  <StyledButton color={color} hoverColor={hoverColor} hoverBackground={hoverBackground} ref={ref} {...props}>
    {name}
    <Icon
      style={{ position: "absolute", top: "11px", right: "8px" }}
      icon="downArrow"
      color={themeGet(`colors.${color}`, color)(color)}
      size="20px"
      p="2px"
    />
  </StyledButton>
));

MenuTriggerButton.propTypes = {
  name: PropTypes.node.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

MenuTriggerButton.defaultProps = {
  color: "white",
  hoverColor: "lightBlue",
  hoverBackground: "black"
};

const MenuTrigger = props => {
  const { menuData, name, color, hoverColor, hoverBackground, "aria-label": ariaLabel, ...otherProps } = props;
  let dropdownMinWidth = "auto";
  const setDropdownMinWidth = popperData => {
    // Popper.js throws an error if popperData is not returned from this fn
    dropdownMinWidth = `${popperData.instance.reference.clientWidth}px`;
    return popperData;
  };
  return (
    <NavBarDropdownMenu
      {...otherProps}
      placement="bottom-start"
      modifiers={{
        flip: { behavior: ["bottom"] },
        setPopperWidth: {
          enabled: true,
          fn: setDropdownMinWidth
        },
        preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" }
      }}
      trigger={() => (
        <MenuTriggerButton
          color={color}
          hoverColor={hoverColor}
          hoverBackground={hoverBackground}
          name={name}
          aria-label={ariaLabel}
        />
      )}
    >
      {({ closeMenu }) => (
        <ul style={{ listStyle: "none", margin: "0", padding: "0", minWidth: dropdownMinWidth }}>
          {renderSubMenuItems(
            menuData,
            e => {
              closeMenu(e);
              e.stopPropagation();
            },
            SubMenuTrigger
          )}
        </ul>
      )}
    </NavBarDropdownMenu>
  );
};

MenuTrigger.propTypes = {
  name: PropTypes.node.isRequired,
  "aria-label": PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

MenuTrigger.defaultProps = {
  menuData: null,
  "aria-label": undefined,
  color: "white",
  hoverColor: "lightBlue",
  hoverBackground: "black"
};

export default MenuTrigger;
