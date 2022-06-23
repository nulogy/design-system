import React from "react";
import styled, { CSSObject } from "styled-components";
import { DropdownText, DropdownLink } from "../DropdownMenu";

const renderSubMenuTrigger = (subMenuItem, onItemClick, SubMenuTrigger, layer) => (
  <NoWrapLi key={subMenuItem.key ?? subMenuItem.name}>
    <SubMenuTrigger
      onItemClick={onItemClick}
      name={subMenuItem.name}
      menuData={subMenuItem.items}
      trigger={subMenuItem.trigger}
      layer={layer}
    />
  </NoWrapLi>
);

const renderSubMenuLink = (subMenuItem, onItemClick) => (
  <NoWrapLi key={subMenuItem.key ?? subMenuItem.name}>
    <DropdownLink py="half" onClick={onItemClick} href={subMenuItem.href} to={subMenuItem.to} as={subMenuItem.as}>
      {subMenuItem.name}
    </DropdownLink>
  </NoWrapLi>
);

const renderCustom = (subMenuItem, onItemClick, _SubMenuTrigger, layer) => (
  <NoWrapLi key={subMenuItem.key ?? subMenuItem.name}>
    {subMenuItem.render({ size: "medium", onItemClick, layer })}
  </NoWrapLi>
);

const renderText = (subMenuItem) => (
  <NoWrapLi key={subMenuItem.key ?? subMenuItem.name}>
    <DropdownText>{subMenuItem.name}</DropdownText>
  </NoWrapLi>
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

const renderSubMenuItems = (subMenuItems, onItemClick, SubMenuTrigger, layer) =>
  subMenuItems.map((subMenuItem) => getRenderFunction(subMenuItem)(subMenuItem, onItemClick, SubMenuTrigger, layer));

const NoWrapLi = styled.li(
  (): CSSObject => ({
    whiteSpace: "nowrap",
  })
);

export default renderSubMenuItems;
