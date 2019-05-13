import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Icon } from "../Icon";
import SubMenuLink from "./SubMenuLink";
import { Dropdown } from "../Dropdown";

const StyledButton = styled.button({
  display: "block",
  position: "relative",
  color: theme.colors.darkBlue,
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  width: "100%",
  padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.lightGrey
  },
  "&:disabled": {
    opacity: ".5"
  },
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  textAlign: "left",
  cursor: "pointer"
});

const SubMenuTriggerButton = React.forwardRef(({ name, ...props }, ref) => (
  <StyledButton ref={ref} {...props}>
    {name}
    <Icon style={{ position: "absolute", top: "11px" }} icon="rightArrow" color="darkBlue" size="20px" p="2px" />
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

const SubMenuTrigger = props => {
  const { menuData, name, linkOnClick, ...otherProps } = props;
  return (
    <Dropdown
      menuAs={"ul"}
      placement="right-start"
      modifiers={null}
      renderArrow={false}
      {...otherProps}
      trigger={() => <SubMenuTriggerButton name={name} />}
    >
      {renderSubMenuItems(menuData, linkOnClick)}
    </Dropdown>
  );
};

SubMenuTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  linkOnClick: PropTypes.func
};

SubMenuTrigger.defaultProps = {
  menuData: null,
  description: null,
  linkOnClick: null
};

export default SubMenuTrigger;
