import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { DropdownLink as SubMenuLink } from "../DropdownMenu";

const ApplySubMenuLinkStyles = styled.li({
  color: theme.colors.black,
  whiteSpace: "nowrap",
  borderColor: "transparent",
  backgroundColor: "transparent",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: theme.fontSizes.medium,
  "> *": {
    display: "block",
    color: theme.colors.darkBlue,
    textDecoration: "none",
    padding: `${theme.space.x1} ${theme.space.x2}`,
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: theme.colors.lightGrey
    },
    "&:disabled": {
      opacity: ".5"
    },
    "&:focus": {
      boxShadow: theme.shadows.focus
    }
  }
});

const renderSubMenuTrigger = (subMenuItem, onItemClick, SubMenuTrigger) => (
  <li style={{ whiteSpace: "nowrap" }} key={subMenuItem.name}>
    <SubMenuTrigger onItemClick={onItemClick} name={subMenuItem.name} menuData={subMenuItem.items} />
  </li>
);

const renderSubMenuLink = (subMenuItem, onItemClick) => (
  <li style={{ whiteSpace: "nowrap" }} key={subMenuItem.name}>
    <SubMenuLink onClick={onItemClick} href={subMenuItem.href}>
      {subMenuItem.name}
    </SubMenuLink>
  </li>
);

const renderCustom = (subMenuItem, onItemClick) => (
  <ApplySubMenuLinkStyles key={subMenuItem.name} onClick={onItemClick}>
    {subMenuItem.render()}
  </ApplySubMenuLinkStyles>
);

const renderText = subMenuItem => <div key={subMenuItem.name}>{subMenuItem.name}</div>;

const getRenderFunction = subMenuItem => {
  if (subMenuItem.items) {
    return renderSubMenuTrigger;
  } else if (subMenuItem.href) {
    return renderSubMenuLink;
  } else if (subMenuItem.render) {
    return renderCustom;
  } else {
    return renderText;
  }
};

const renderSubMenuItems = (subMenuItems, onItemClick, SubMenuTrigger) =>
  subMenuItems.map(subMenuItem => getRenderFunction(subMenuItem)(subMenuItem, onItemClick, SubMenuTrigger));

export default renderSubMenuItems;
