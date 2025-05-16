import { useState, useCallback, useLayoutEffect, useRef } from "react";
import equal from "deep-equal";
import { MenuItems, MenuItem } from "../types";
import { MIN_DISTANCE_BETWEEN_MENUS_PX } from "../components/shared/constants";

type MenuState = {
  menuItems: MenuItems;
  moreMenu: MenuItems;
  hiddenMenuItem: MenuItem | null;
};

type UseResponsiveMenu = (initialMenuItems: MenuItems) => {
  menuItems: MenuItems;
  moreMenu: MenuItems;
  hiddenMenuItem: MenuItem | null;
  primaryMenuRef: React.RefObject<HTMLUListElement>;
  secondaryMenuRef: React.RefObject<HTMLUListElement>;
  hiddenButtonRef: React.RefObject<HTMLLIElement>;
};

export const useResponsiveMenu: UseResponsiveMenu = (initialMenuItems: MenuItems) => {
  const [menuState, setMenuState] = useState<MenuState>({
    menuItems: initialMenuItems,
    moreMenu: [],
    hiddenMenuItem: {
      key: "hidden-menu-item",
      label: "",
      type: "button",
    },
  });

  const primaryMenuRef = useRef<HTMLUListElement>(null);
  const secondaryMenuRef = useRef<HTMLUListElement>(null);
  const hiddenButtonRef = useRef<HTMLLIElement>(null);

  const calculateDistance = useCallback(() => {
    if (!primaryMenuRef.current || !secondaryMenuRef.current || !hiddenButtonRef.current) {
      return false;
    }

    const primaryRect = primaryMenuRef.current.getBoundingClientRect();
    const secondaryRect = secondaryMenuRef.current.getBoundingClientRect();
    const hiddenButtonWidth = hiddenButtonRef.current.getBoundingClientRect().width;
    const distance = secondaryRect.left - primaryRect.right;

    if (distance < MIN_DISTANCE_BETWEEN_MENUS_PX && menuState.menuItems.length > 0) {
      const lastItem = menuState.menuItems[menuState.menuItems.length - 1];
      const newMenuItems = menuState.menuItems.slice(0, -1);
      const newHiddenMenu = [lastItem, ...menuState.moreMenu];

      if (!equal(newMenuItems, menuState.menuItems) || !equal(newHiddenMenu, menuState.moreMenu)) {
        setMenuState({
          menuItems: newMenuItems,
          moreMenu: newHiddenMenu,
          hiddenMenuItem: lastItem,
        });
      }
    } else if (
      Math.floor(distance - hiddenButtonWidth - 8) > MIN_DISTANCE_BETWEEN_MENUS_PX &&
      menuState.moreMenu.length > 0
    ) {
      const firstHiddenItem = menuState.moreMenu[0];
      const newHiddenMenu = menuState.moreMenu.slice(1);
      const newMenuItems = [...menuState.menuItems, firstHiddenItem];

      if (!equal(newHiddenMenu, menuState.moreMenu) || !equal(newMenuItems, menuState.menuItems)) {
        setMenuState({
          menuItems: newMenuItems,
          moreMenu: newHiddenMenu,
          hiddenMenuItem: firstHiddenItem,
        });
      }
    }
  }, [menuState]);

  useLayoutEffect(() => {
    calculateDistance();

    window.addEventListener("resize", calculateDistance);
    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, [calculateDistance]);

  return {
    menuItems: menuState.menuItems,
    moreMenu: menuState.moreMenu,
    hiddenMenuItem: menuState.hiddenMenuItem,
    primaryMenuRef,
    secondaryMenuRef,
    hiddenButtonRef,
  };
};
