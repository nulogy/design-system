import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick, keyCodes } from "../Utils";
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
      this.timeoutID = setTimeout(
        () => this.setState({ open: newState }),
        newState ? this.props.showDelay : this.props.hideDelay
      );
    } else {
      this.setState({ open: newState });
    }
  }

  closeMenu(skipTimer) {
    this.setSubMenuState(false, skipTimer);
  }

  openMenu(skipTimer) {
    this.setSubMenuState(true, skipTimer);
  }

  subMenuEventHandlers() {
    return {
      onClick: () => this.openMenu(),
      onBlur: () => this.closeMenu(),
      onFocus: () => this.openMenu(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  menuTriggerEventHandlers() {
    return {
      onBlur: () => this.closeMenu(),
      onClick: () => this.openMenu(),
      onKeyDown: e => this.handleKeyDown(e)
    };
  }

  clearScheduled() {
    clearTimeout(this.timeoutID);
  }

  handleOutsideClick() {
    this.closeMenu(true);
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
    const { trigger, children, backgroundColor, placement, modifiers, showArrow } = this.props;
    const childrenFnc = typeof children === "function" ? children : () => children;
    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            React.cloneElement(trigger(), {
              "aria-haspopup": true,
              "aria-expanded": this.state.open,
              ...this.menuTriggerEventHandlers(),
              ref
            })
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
                {...this.subMenuEventHandlers()}
                ref={node => {
                  popperProps.ref(node);
                  this.setMenuRef(node);
                }}
              >
                <DetectOutsideClick onClick={this.handleOutsideClick} clickRef={this.menuRef} />
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
  defaultOpen: PropTypes.bool
};

DropdownMenu.defaultProps = {
  showDelay: "100",
  hideDelay: "200",
  trigger: () => <IconicButton icon="more" />,
  backgroundColor: undefined,
  showArrow: true,
  placement: "bottom-start",
  modifiers: { flip: { behavior: ["bottom"] } },
  defaultOpen: false
};

export default DropdownMenu;
