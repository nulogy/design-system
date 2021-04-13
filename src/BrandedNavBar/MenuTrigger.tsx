import React from "react";
import styled, { CSSObject } from "styled-components";
import PropTypes from "prop-types";
import { themeGet } from "@styled-system/theme-get";
import { Icon } from "../Icon";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import renderSubMenuItems from "./renderSubMenuItems";
import { DefaultNDSThemeType } from '../theme.type';

type MenuTriggerProps = {
  name?: string;
  "aria-label"?: string;
  menuData?: any[];
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
};

type StyledButtonProps = React.ComponentPropsWithRef<"button"> & {
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  theme?: DefaultNDSThemeType;
};

const StyledButton = styled.button(
  ({
    color = "white",
    hoverColor = "lightBlue",
    hoverBackground = "black",
    theme,
  }: StyledButtonProps): CSSObject => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    fontWeight: theme.fontWeights.medium,
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
      cursor: "pointer",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
    "&:disabled": {
      opacity: ".5",
    },
  })
);

type MenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> & {
  name?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
};

const MenuTriggerButton = React.forwardRef<
  HTMLButtonElement,
  MenuTriggerButtonProps
>(
  (
    {
      name,
      color,
      hoverColor,
      hoverBackground,
      ...props
    }: MenuTriggerButtonProps,
    ref
  ) => (
    <StyledButton
      color={color}
      hoverColor={hoverColor}
      hoverBackground={hoverBackground}
      ref={ref}
      {...props}
    >
      {name}
      <Icon
        style={{
          position: "absolute",
          top: "52%",
          transform: "translateY(-50%)",
          right: "8px",
        }}
        icon="downArrow"
        color={themeGet(`colors.${color}`, color)(color)}
        size="20px"
        p="2px"
      />
    </StyledButton>
  )
);

MenuTriggerButton.displayName = "MenuTriggerButton";

const MenuTrigger = ({
  menuData,
  name,
  color,
  hoverColor,
  hoverBackground,
  "aria-label": ariaLabel,
  ...props
}: MenuTriggerProps) => {
  let dropdownMinWidth = "auto";
  const setDropdownMinWidth = (popperData) => {
    // Popper.js throws an error if popperData is not returned from this fn
    dropdownMinWidth = `${popperData.instance.reference.clientWidth}px`;
    return popperData;
  };
  return (
    // @ts-ignore
    <NavBarDropdownMenu
      {...props}
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
};

export default MenuTrigger;
