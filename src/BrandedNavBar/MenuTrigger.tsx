import React from "react";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import renderSubMenuItems from "./renderSubMenuItems";
import MenuTriggerButton from "./MenuTriggerButton";
import { TriggerFunctionProps } from "./TriggerFunctionProps";

export type MenuTriggerProps = {
  name?: string;
  "aria-label"?: string;
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  menuData?: any[];
  trigger?: (props: TriggerFunctionProps) => React.ReactNode;
};

const MenuTrigger = ({
  menuData,
  name,
  color,
  hoverColor,
  hoverBackground,
  "aria-label": ariaLabel,
  trigger,
  ...props
}: MenuTriggerProps) => {
  let dropdownMinWidth = "auto";
  const setDropdownMinWidth = (popperData) => {
    // Popper.js throws an error if popperData is not returned from this fn
    dropdownMinWidth = `${popperData.instance.reference.clientWidth}px`;
    return popperData;
  };
  const triggerProps = {
    color,
    hoverColor,
    hoverBackground,
    name,
    "aria-label": ariaLabel,
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
      trigger={() => {
        const defaultRender = () => <MenuTriggerButton {...triggerProps} />;
        return trigger
          ? trigger({ mode: "desktop", defaultRender })
          : defaultRender();
      }}
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
