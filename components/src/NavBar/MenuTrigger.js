import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Icon } from "../Icon";
import SubMenuTrigger from "./SubMenuTrigger";
import SubMenuLink from "./SubMenuLink";
import { Dropdown } from "../Dropdown";

const StyledButton = styled.button({
  display: "block",
  position: "relative",
  color: theme.colors.white,
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.lightBlue,
    backgroundColor: theme.colors.black,
    cursor: "pointer"
  },
  "&:disabled": {
    opacity: ".5"
  }
});

const MenuTriggerButton = React.forwardRef(({ name, ...props }, ref) => (
  <StyledButton ref={ref} {...props}>
    {name}
    <Icon style={{ position: "absolute", top: "11px" }} icon="downArrow" color="lightGrey" size="20px" p="2px" />
  </StyledButton>
));

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
    }
  }
});

const renderSubMenuTrigger = (subMenuItem, linkOnClick) => (
  <li style={{ whiteSpace: "nowrap" }} key={subMenuItem.name}>
    <SubMenuTrigger linkOnClick={linkOnClick} name={subMenuItem.name} menuData={subMenuItem.items} />
  </li>
);

const renderSubMenuLink = (subMenuItem, linkOnClick) => (
  <li style={{ whiteSpace: "nowrap" }} key={subMenuItem.name}>
    <SubMenuLink onClick={linkOnClick} href={subMenuItem.href}>
      {subMenuItem.name}
    </SubMenuLink>
  </li>
);

const renderCustom = (subMenuItem, linkOnClick) => (
  <ApplySubMenuLinkStyles key={subMenuItem.name} onClick={linkOnClick}>
    {subMenuItem.render()}
  </ApplySubMenuLinkStyles>
);

const getRenderFunction = subMenuItem => {
  if (subMenuItem.items) {
    return renderSubMenuTrigger;
  } else if (subMenuItem.href) {
    return renderSubMenuLink;
  } else if (subMenuItem.render) {
    return renderCustom;
  } else {
    return () => null;
  }
};

const renderSubMenuItems = (subMenuItems, linkOnClick) =>
  subMenuItems.map(subMenuItem => getRenderFunction(subMenuItem)(subMenuItem, linkOnClick));

const MenuTrigger = props => {
  const { menuData, name, ...otherProps } = props;
  return (
    <Dropdown {...otherProps} trigger={() => <MenuTriggerButton name={name} />}>
      {({ closeMenu }) => (
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>{renderSubMenuItems(menuData, closeMenu)}</ul>
      )}
    </Dropdown>
  );
};

MenuTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(PropTypes.shape({}))
};

MenuTrigger.defaultProps = {
  menuData: null
};

export default MenuTrigger;
