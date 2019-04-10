import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "ComponentsRoot/theme";
import SubMenu from "./SubMenu";
import SubMenuTrigger from "./SubMenuTrigger";
import SubMenuLink from "./SubMenuLink";
import Icon from "../Icon/Icon";

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const MenuTriggerButton = styled.button({
  display: "inline-flex",
  color: theme.colors.white,
  border: "none",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.half} ${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.lightBlue,
    backgroundColor: theme.colors.black,
    cursor: "pointer",
  },
  "&:disabled": {
    opacity: ".5",
  },
});

const SubMenuLinkStyles = styled.li({
  color: theme.colors.black,
  borderColor: "transparent",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: theme.fontSizes.medium,
  maxWidth: "20em",
  "& *": {
    display: "block",
    color: theme.colors.darkBlue,
    textDecoration: "none",
    padding: `${theme.space.x1} ${theme.space.x2}`,
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: theme.colors.lightGrey,
    },
    "&:disabled": {
      opacity: ".5",
    },
  },
});

const keyCode = Object.freeze({
  "TAB": 9,
  "RETURN": 13,
  "ESC": 27,
  "SPACE": 32,
  "PAGEUP": 33,
  "PAGEDOWN": 34,
  "END": 35,
  "HOME": 36,
  "LEFT": 37,
  "UP": 38,
  "RIGHT": 39,
  "DOWN": 40,
});

const itemType = menuItem => {
  if (menuItem.items) {
    return "MenuTrigger";
  } else if (menuItem.link) {
    return "CustomLink";
  } else if (menuItem.href && menuItem.name) {
    return "MenuLink";
  } else {
    return null;
  }
};

const renderSubMenuItems = subMenuItems => subMenuItems.map(subMenuItem => {
  switch (itemType(subMenuItem)) {
    case "MenuTrigger":
      return (
        <li key={ subMenuItem.name }>
          <SubMenuTrigger name={ subMenuItem.name } description={ subMenuItem.description } menuData={ subMenuItem.items } />
        </li>
      ); case "MenuLink":
      return (
        <li key={ subMenuItem.name }>
          <SubMenuLink name={ subMenuItem.name } description={ subMenuItem.description } href={ subMenuItem.href } />
        </li>
      );
    case "CustomLink":
      return (
        <SubMenuLinkStyles key={ subMenuItem.name }>
          {subMenuItem.link}
        </SubMenuLinkStyles>
      );
    default:
      return (<div style={ { color: "red" } }>Data Missing</div>);
  }
});

/* eslint-disable react/destructuring-assignment */
class MenuTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
  }

  setSubMenuState(newState, skipTimer = false) {
    this.clearScheduled();
    if (!skipTimer) {
      this.showTimeoutID = setTimeout(() => this.setState({ subMenuOpen: newState }), this.props.showDelay);
    } else {
      this.setState({ subMenuOpen: newState });
    }
  }

  hideSubMenu(skipTimer) {
    this.setSubMenuState(false, skipTimer);
  }

  showSubMenu(skipTimer) {
    this.setSubMenuState(true, skipTimer);
  }

  subMenuEventHandlers() {
    return ({
      onFocus: () => (this.showSubMenu()),
      onBlur: () => (this.hideSubMenu()),
      onClick: () => (this.showSubMenu()),
      onKeyDown: e => (this.handleKeyDown(e)),
    });
  }

  menuTriggerEventHandlers() {
    return ({
      onClick: () => {
        this.showSubMenu();
      },
      onBlur: () => (this.hideSubMenu()),
      onKeyDown: e => (this.handleKeyDown(e)),
    });
  }

  clearScheduled() {
    clearTimeout(this.hideTimeoutID);
    clearTimeout(this.showTimeoutID);
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case keyCode.ESC:
        this.hideSubMenu(true);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <MenuTriggerButton aria-haspopup="true" aria-expanded={ this.state.subMenuOpen } { ...this.props } { ...this.menuTriggerEventHandlers() } ref={ ref }>
              { this.props.name }
              <Icon icon="downArrow" color="lightGrey" size="20px" p="2px" />
            </MenuTriggerButton>
          )}
        </Reference>
        {this.state.subMenuOpen && (
        <Popper placement="bottom-start" modifiers={ { flip: { behavior: ["bottom"] } } }>
          {popperProps => (
            <SubMenu popperProps={ popperProps } { ...this.subMenuEventHandlers() }>
              <SubMenuItemsList>
                {renderSubMenuItems(this.props.menuData)}
              </SubMenuItemsList>
            </SubMenu>
          )}
        </Popper>
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */


MenuTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MenuTrigger.defaultProps = {
  menuData: null,
  showDelay: "100",
  hideDelay: "350",
};

export default MenuTrigger;
