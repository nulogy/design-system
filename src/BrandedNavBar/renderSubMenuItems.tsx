import React from "react";
import styled, { CSSObject } from "styled-components";
import { DropdownText, DropdownLink } from "../DropdownMenu";
import { Icon } from "../Icon";

const renderSubMenuTrigger = (subMenuItem, onItemClick, SubMenuTrigger, layer, menuType) => (
  <NoWrapLi key={subMenuItem.key ?? subMenuItem.name}>
    <SubMenuTrigger
      onItemClick={onItemClick}
      name={subMenuItem.name}
      menuData={subMenuItem.items}
      trigger={subMenuItem.trigger}
      layer={layer}
      menuType={menuType}
    />
  </NoWrapLi>
);

const renderSubMenuLink = (subMenuItem, onItemClick) => {
  const linkProps = {
    onClick: onItemClick,
    href: subMenuItem.href,
    to: subMenuItem.to,
    as: subMenuItem.as,
    target: subMenuItem.openInNew ? "_blank" : null,
  };

  return (
    <NoWrapLi key={subMenuItem.key ?? subMenuItem.name}>
      <DropdownLink {...linkProps}>
        {subMenuItem.name}
        {subMenuItem.openInNew && <Icon size="16px" ml="4px" icon="openInNew" />}
      </DropdownLink>
    </NoWrapLi>
  );
};

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

const renderSubMenuItems = (subMenuItems, onItemClick, SubMenuTrigger, layer, menuType) =>
  subMenuItems.map((subMenuItem) =>
    getRenderFunction(subMenuItem)(subMenuItem, onItemClick, SubMenuTrigger, layer, menuType)
  );

const NoWrapLi = styled.li(
  (): CSSObject => ({
    whiteSpace: "nowrap",
  })
);

export default renderSubMenuItems;
