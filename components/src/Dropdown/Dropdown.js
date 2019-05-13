import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "../theme";
import { DetectOutsideClick } from "../Utils";
import { IconicButton } from "../Button";
import DropdownMenu from "./DropdownMenu";

const keyCode = Object.freeze({
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
});

/* eslint-disable react/destructuring-assignment */
class MenuTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
  }

  componentWillUnmount() {
    this.clearScheduled();
  }

  setMenuRef(node) {
    this.menuRef = node;
  }

  setSubMenuState(newState, skipTimer = false) {
    this.clearScheduled();
    if (!skipTimer) {
      this.showTimeoutID = setTimeout(
        () => this.setState({ subMenuOpen: newState }),
        newState ? this.props.showDelay : this.props.hideDelay
      );
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
    return {
      onClick: () => this.showSubMenu(),
      onBlur: () => this.hideSubMenu(),
      onFocus: () => this.showSubMenu(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  menuTriggerEventHandlers() {
    return {
      onBlur: () => this.hideSubMenu(),
      onClick: () => this.showSubMenu(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  clearScheduled() {
    clearTimeout(this.hideTimeoutID);
    clearTimeout(this.showTimeoutID);
  }

  handleOutsideClick() {
    this.hideSubMenu(true);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case keyCode.ESC:
        this.hideSubMenu(true);
        break;
      default:
        break;
    }
  }

  render() {
    const { trigger, menuContent } = this.props;
    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            React.cloneElement(trigger(), {
              "aria-haspopup": true,
              "aria-expanded": this.state.subMenuOpen,
              ...this.menuTriggerEventHandlers(),
              ref: ref
            })
          }
        </Reference>
        {this.state.subMenuOpen && (
          <Popper placement="bottom-start" modifiers={{ flip: { behavior: ["bottom"] } }}>
            {popperProps => (
              <DropdownMenu
                popperProps={popperProps}
                {...this.subMenuEventHandlers()}
                ref={node => {
                  popperProps.ref(node);
                  this.setMenuRef(node);
                }}
              >
                <DetectOutsideClick onClick={this.handleOutsideClick} clickRef={this.menuRef} />
                {menuContent()}
              </DropdownMenu>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

MenuTrigger.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  menuContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

MenuTrigger.defaultProps = {
  menuData: null,
  showDelay: "100",
  hideDelay: "200",
  trigger: () => <button>hi</button>,
  menuContent: () => <div>empty</div>
};

export default MenuTrigger;
