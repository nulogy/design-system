import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "ComponentsRoot/theme";
import SubMenuItemList from "./SubMenuItemList";
import SubMenu from "./SubMenu";

const MenuDropdownButton = styled.button({
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
  padding: `${theme.space.x1} ${theme.space.x2}`,
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

/* eslint-disable react/destructuring-assignment */
class MenuDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
      focusIndex: 0,
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

  focusFirstItem() {
    this.setState({ focusIndex: 0 });
  }

  focusLastItem() {
    this.setState({ focusIndex: this.props.children.length - 1 });
  }

  focusNextItem() {
    let nextIndex;
    if (this.state.focusIndex === this.props.children.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = this.state.focusIndex + 1;
    }
    this.setState({ focusIndex: nextIndex });
  }

  focusPrevItem() {
    let prevIndex;
    if (this.state.focusIndex === 0) {
      prevIndex = this.props.children.length - 1;
    } else {
      prevIndex = this.state.focusIndex - 1;
    }
    this.setState({ focusIndex: prevIndex });
  }

  subMenuEventHandlers() {
    return ({
      onFocus: () => (this.showSubMenu()),
      onBlur: () => (this.hideSubMenu()),
      onClick: () => (this.showSubMenu()),
      onKeyDown: e => (this.handleKeyDown(e)),
    });
  }

  menuDropdownEventHandlers() {
    return ({
      onClick: () => (this.showSubMenu()),
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
      case keyCode.UP:
        if (this.state.subMenuOpen) {
          this.focusPrevItem();
        } else {
          this.showSubMenu(true);
          this.focusLastItem();
        }
        break;
      case keyCode.DOWN:
        if (this.state.subMenuOpen) {
          this.focusNextItem();
        } else {
          this.showSubMenu(true);
          this.focusFirstItem();
        }
        break;
      case keyCode.ENTER:
        if (!this.state.subMenuOpen) {
          this.showSubMenu(true);
          this.focusFirstItem();
        }
        break;
      case keyCode.HOME:
        if (this.state.subMenuOpen) {
          this.focusFirstItem();
        }
        break;
      case keyCode.END:
        if (this.state.subMenuOpen) {
          this.focusLastItem();
        }
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
            <MenuDropdownButton aria-haspopup="true" aria-expanded={ this.state.subMenuOpen } { ...this.props } { ...this.menuDropdownEventHandlers() } ref={ ref }>{ this.props.labelText }</MenuDropdownButton>
          )}
        </Reference>
        {this.state.subMenuOpen && (
        <Popper placement="bottom-start">
          {popperProps => (
            <SubMenu popperProps={ popperProps } { ...this.subMenuEventHandlers() }>
              <SubMenuItemList focusIndex={ this.state.focusIndex }>
                {this.props.children}
              </SubMenuItemList>
            </SubMenu>
          )}
        </Popper>
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */


MenuDropdown.propTypes = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MenuDropdown.defaultProps = {
  children: null,
  showDelay: "100",
  hideDelay: "350",
};

export default MenuDropdown;
