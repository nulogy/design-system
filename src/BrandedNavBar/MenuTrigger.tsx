import React from "react";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import renderSubMenuItems from "./renderSubMenuItems";
import MenuTriggerButton from "./MenuTriggerButton";

export type TriggerFunctionProps = {
  name?: string;
  "aria-label"?: string;
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
};

export type MenuTriggerProps = TriggerFunctionProps & {
  menuData?: any[];
  trigger?: (props: TriggerFunctionProps) => JSX.Element;
};

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
