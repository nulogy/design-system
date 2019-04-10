import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "ComponentsRoot/theme";
import { Text, Icon } from "ComponentsRoot";
import SubMenu from "./SubMenu";
import SubMenuLink from "./SubMenuLink";

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const SubMenuTriggerButton = styled.button({
  display: "block",
  color: theme.colors.darkBlue,
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  width: "100%",
  padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.lightGrey,
  },
  "&:disabled": {
    opacity: ".5",
  },
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  textAlign: "left",
  cursor: "pointer",
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
class SubMenuTrigger extends React.Component {
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

  SubMenuTriggerEventHandlers() {
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
            <SubMenuTriggerButton style={ { position: "relative" } } aria-haspopup="true" aria-expanded={ this.state.subMenuOpen } { ...this.props } { ...this.SubMenuTriggerEventHandlers() } ref={ ref }>
              { this.props.name }
              <span>
                <Icon style={ { position: "absolute", top: "11px" } } icon="rightArrow" color="darkBlue" size="20px" p="2px" />
              </span>
              {this.props.description && (
              <Text inline style={ { display: "block" } } color="darkGrey" fontSize={ theme.fontSizes.small } lineHeight={ theme.lineHeights.smallTextBase }>
                {this.props.description}
              </Text>
              )}
            </SubMenuTriggerButton>
          )}
        </Reference>
        {this.state.subMenuOpen && (
        <Popper placement="right-start">
          {popperProps => (
            <SubMenu renderArrow={ false } popperProps={ popperProps } { ...this.subMenuEventHandlers() }>
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


SubMenuTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SubMenuTrigger.defaultProps = {
  menuData: null,
  description: null,
  showDelay: "100",
  hideDelay: "350",
};

export default SubMenuTrigger;
