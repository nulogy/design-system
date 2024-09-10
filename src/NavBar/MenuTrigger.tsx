import React, { ReactNode } from "react";
import styled, { useTheme } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import theme from "../theme";
import { Icon } from "../Icon";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import renderSubMenuItems from "./renderSubMenuItems";

export type MenuTriggerProps = {
  name?: ReactNode;
  "aria-label"?: string;
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  menuData?: any[];
};

const StyledButton = styled.button<{
  hoverColor: string;
  hoverBackground: string;
}>(({ color = "white", hoverColor = "lightBlue", hoverBackground = "black", ...props }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  color: themeGet(`colors.${color}`, color)(props),
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
    color: themeGet(`colors.${hoverColor}`, hoverColor)(props),
    backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(props),
    cursor: "pointer",
  },
  "&:focus": {
    boxShadow: theme.shadows.focus,
  },
  "&:disabled": {
    opacity: ".5",
  },
}));

StyledButton.defaultProps = {};

const MenuTriggerButton = React.forwardRef<any, MenuTriggerProps>(
  ({ name, color, hoverColor, hoverBackground, ...props }, ref) => (
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
  )
);

function MenuTrigger({
  menuData,
  name,
  color,
  hoverColor,
  hoverBackground,
  "aria-label": ariaLabel,
  ...otherProps
}: MenuTriggerProps) {
  const theme = useTheme();

  color = color || theme.colors.white;
  hoverColor = hoverColor || theme.colors.lightBlue;
  hoverBackground = hoverBackground || theme.colors.black;

  let dropdownMinWidth = "auto";
  const setDropdownMinWidth = (popperData) => {
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
          fn: setDropdownMinWidth,
        },
        preventOverflow: {
          enabled: true,
          padding: 8,
          boundariesElement: "viewport",
        },
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
        <ul
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
            minWidth: dropdownMinWidth,
          }}
        >
          {renderSubMenuItems(
            menuData,
            (e) => {
              closeMenu(e);
              e.stopPropagation();
            },
            SubMenuTrigger
          )}
        </ul>
      )}
    </NavBarDropdownMenu>
  );
}

export default MenuTrigger;
