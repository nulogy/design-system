import { MenuItem } from "../../types";

export function getNavigationBarItems(items: MenuItem[]): MenuItem[] {
  const navigationBarItems: MenuItem[] = [];

  function findNavigationBarItems(menuItems: MenuItem[]) {
    for (const item of menuItems) {
      if (item.mobileVisibility === "navigationBar") {
        navigationBarItems.push(item);
      }
      if (item.type === "button" && item.items) {
        findNavigationBarItems(item.items);
      }
    }
  }

  findNavigationBarItems(items);
  return navigationBarItems;
}
