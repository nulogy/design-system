import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick } from "../utils";
import { keyCodes } from "../constants";
import { IconicButton } from "../Button";
import DropdownMenuContainer from "./DropdownMenuContainer";

/* eslint-disable react/destructuring-assignment */
class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.defaultOpen
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
    this.setTriggerRef = this.setTriggerRef.bind(this);
  }

  componentWillUnmount() {
    this.clearScheduled();
  }

  setMenuRef(node) {
    this.menuRef = node;
  }

  setTriggerRef(node) {
    this.triggerRef = node;
  }

  conditionallyApplyDelay(fnc, skipTimer, delay) {
    if (!skipTimer) {
      this.timeoutID = setTimeout(fnc, delay);
    } else {
      fnc();
    }
  }

  toggleMenuState(skipTimer = false) {
    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState(prevState => ({ open: !prevState.open })),
      skipTimer,
      this.state.open ? this.props.hideDelay : this.props.showDelay
    );
  }

  setMenuState(newState, skipTimer = false) {
    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState({ open: newState }),
      skipTimer,
      newState ? this.props.showDelay : this.props.hideDelay
    );
  }

  closeMenu(skipTimer) {
    this.setMenuState(false, skipTimer);
  }

  openMenu(skipTimer) {
    this.setMenuState(true, skipTimer);
  }

  handleTriggerClick() {
    if (this.props.triggerTogglesMenuState) {
      this.toggleMenuState();
    } else {
      this.openMenu();
    }
  }

  menuEventHandlers() {
    return {
      onBlur: () => this.closeMenu(),
      onFocus: () => this.openMenu(),
      onClick: () => this.openMenu(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  menuTriggerEventHandlers() {
    return {
      onBlur: () => this.closeMenu(),
      onClick: () => this.handleTriggerClick(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  clearScheduled() {
    clearTimeout(this.timeoutID);
  }

  handleOutsideClick(e) {
    console.log(e.target);
    this.closeMenu();
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case keyCodes.ESC:
        this.closeMenu(true);
        break;
      default:
        break;
    }
  }

  render() {
    const { trigger, children, disabled, backgroundColor, placement, modifiers, showArrow } = this.props;
    const childrenFnc = typeof children === "function" ? children : () => children;
    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            React.cloneElement(
              trigger({
                closeMenu: e => {
                  this.closeMenu(true);
                  e.stopPropagation();
                },
                openMenu: e => {
                  this.openMenu(true);
                  e.stopPropagation();
                }
              }),
              {
                "aria-haspopup": true,
                "aria-expanded": this.state.open,
                type: "button",
                disabled: disabled ? true : null,
                ...this.menuTriggerEventHandlers(),
                ref: node => {
                  ref(node);
                  this.setTriggerRef(node);
                }
              }
            )
          }
        </Reference>
        {this.state.open && (
          <Popper placement={placement} modifiers={modifiers}>
            {popperProps => (
              <DropdownMenuContainer
                placement={placement}
                backgroundColor={backgroundColor}
                popperProps={popperProps}
                showArrow={showArrow}
                {...this.menuEventHandlers()}
                ref={node => {
                  popperProps.ref(node);
                  this.setMenuRef(node);
                }}
              >
                <DetectOutsideClick onClick={this.handleOutsideClick} clickRef={[this.menuRef, this.triggerRef]} />
                {childrenFnc({
                  closeMenu: e => {
                    this.closeMenu(true);
                    e.stopPropagation();
                  },
                  openMenu: e => {
                    this.openMenu(true);
                    e.stopPropagation();
                  }
                })}
              </DropdownMenuContainer>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

DropdownMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  disabled: PropTypes.bool,
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  backgroundColor: PropTypes.string,
  showArrow: PropTypes.bool,
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end"
  ]),
  modifiers: PropTypes.shape({}),
  defaultOpen: PropTypes.bool,
  triggerTogglesMenuState: PropTypes.bool
};

DropdownMenu.defaultProps = {
  disabled: false,
  showDelay: "100",
  hideDelay: "200",
  trigger: () => <IconicButton icon="more" />,
  backgroundColor: undefined,
  showArrow: true,
  placement: "bottom-start",
  modifiers: { flip: { behavior: ["bottom"] } },
  defaultOpen: false,
  triggerTogglesMenuState: true
};

export default DropdownMenu;
