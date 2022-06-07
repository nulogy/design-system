import React from "react";
import { DropdownText, DropdownLink } from "../DropdownMenu";

const renderSubMenuTrigger = (subMenuItem, onItemClick, SubMenuTrigger) => (
  <li
    style={{ whiteSpace: "nowrap" }}
    key={subMenuItem.key ?? subMenuItem.name}
  >
    <SubMenuTrigger
      onItemClick={onItemClick}
      name={subMenuItem.name}
      menuData={subMenuItem.items}
    />
  </li>
);

const renderSubMenuLink = (subMenuItem, onItemClick) => (
  <li
    style={{ whiteSpace: "nowrap" }}
    key={subMenuItem.key ?? subMenuItem.name}
  >
    <DropdownLink
      py="half"
      onClick={onItemClick}
      href={subMenuItem.href}
      to={subMenuItem.to}
      as={subMenuItem.as}
    >
      {subMenuItem.name}
    </DropdownLink>
  </li>
);

const renderCustom = (subMenuItem, onItemClick) => (
  <li
    style={{ whiteSpace: "nowrap" }}
    key={subMenuItem.key ?? subMenuItem.name}
  >
    {subMenuItem.render(onItemClick)}
  </li>
);

const renderText = (subMenuItem) => (
  <li
    style={{ whiteSpace: "nowrap" }}
    key={subMenuItem.key ?? subMenuItem.name}
  >
    <DropdownText>{subMenuItem.name}</DropdownText>
  </li>
);

const getRenderFunction = (subMenuItem) => {
  if (subMenuItem.items) {
    return renderSubMenuTrigger;
  } else if (subMenuItem.href || subMenuItem.to) {
    return renderSubMenuLink;
  } else if (subMenuItem.render) {
    return renderCustom;
  } else {
    return renderText;
  }
};

const renderSubMenuItems = (subMenuItems, onItemClick, SubMenuTrigger) =>
  subMenuItems.map((subMenuItem) =>
    getRenderFunction(subMenuItem)(subMenuItem, onItemClick, SubMenuTrigger)
  );

export default renderSubMenuItems;
