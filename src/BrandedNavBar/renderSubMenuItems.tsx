import React from "react";
import styled, { CSSObject } from "styled-components";
import { fontSize, lineHeight, space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import theme from "../theme";
import { DropdownLink } from "../DropdownMenu";

const SubMenuLink = styled(DropdownLink)(fontSize, lineHeight, space);

SubMenuLink.propTypes = {
  ...propTypes.fontSize,
  ...propTypes.lineHeight,
  ...propTypes.space,
};

const getSharedStyles = (): CSSObject => ({
  display: "block",
  whiteSpace: "nowrap",
  textDecoration: "none",
  borderColor: "transparent",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.smallTextBase,
  fontSize: `${theme.fontSizes.small}`,
  padding: `${theme.space.half} ${theme.space.x2}`,
});

const ApplySubMenuLinkStyles = styled.li((): any => ({
  color: theme.colors.darkBlue,
  verticalAlign: "middle",
  "> *": {
    ...getSharedStyles(),
    transition: ".2s",
    textDecoration: "none",
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: theme.colors.lightGrey,
    },
    "&:disabled": {
      opacity: ".5",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
  },
}));

const SubMenuText = styled.li((): any => ({
  color: theme.colors.darkGrey,
  ...getSharedStyles(),
}));

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
    <SubMenuLink
      fontSize="small"
      lineHeight="smallTextBase"
      py="half"
      onClick={onItemClick}
      href={subMenuItem.href}
      to={subMenuItem.to}
      as={subMenuItem.as}
    >
      {subMenuItem.name}
    </SubMenuLink>
  </li>
);

const renderCustom = (subMenuItem, onItemClick) => (
  <ApplySubMenuLinkStyles
    key={subMenuItem.key ?? subMenuItem.name}
    onClick={onItemClick}
  >
    {subMenuItem.render()}
  </ApplySubMenuLinkStyles>
);

const renderText = (subMenuItem) => (
  <SubMenuText key={subMenuItem.key ?? subMenuItem.name}>
    {subMenuItem.name}
  </SubMenuText>
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
