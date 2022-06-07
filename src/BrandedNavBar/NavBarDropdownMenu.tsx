/* TS IGNORED: due to problems typing propTypes and defaultProps,
it can stop being ingnored when its refactored to a functional component */
import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick, withMenuState, PopperArrow } from "../utils";
import DropdownMenuContainer from "../DropdownMenu/DropdownMenuContainer";

type MenuState = {
  isOpen?: boolean;
  openMenu?: Function;
  closeMenu?: Function;
  toggleMenu?: Function;
};

type NavBarDropdownMenuProps = {
  children?: React.ReactNode;
  trigger?: Function;
  menuState?: MenuState;
  showArrow?: boolean;
  placement?: "bottom-start" | "right-start";
  modifiers?: any;
  triggerTogglesMenuState?: boolean;
  dropdownMenuContainerEventHandlers?: Function;
};

class StatelessNavBarDropdownMenuClass extends React.Component<
  NavBarDropdownMenuProps,
  any
> {
  menuRef: any;
  triggerRef: any;
}

type Ref = {
  ref: any;
};

/* eslint-disable react/destructuring-assignment */
class StatelessNavBarDropdownMenu extends StatelessNavBarDropdownMenuClass {
  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
    this.setTriggerRef = this.setTriggerRef.bind(this);
  }

  setMenuRef(node) {
    this.menuRef = node;
  }

  setTriggerRef(node) {
    this.triggerRef = node;
  }

  menuTriggerEventHandlers() {
    return {
      onBlur: () => this.props.menuState.closeMenu(false),
      onClick: () => this.handleTriggerClick(),
    };
  }

  menuEventHandlers() {
    return {
      onBlur: () => this.props.menuState.closeMenu(false),
      onFocus: () => this.props.menuState.openMenu(false),
      onClick: () => this.props.menuState.openMenu(false),
    };
  }

  handleTriggerClick() {
    if (this.props.triggerTogglesMenuState) {
      this.props.menuState.toggleMenu();
    } else {
      this.props.menuState.openMenu();
    }
  }

  handleOutsideClick() {
    this.props.menuState.closeMenu(false);
  }

  render() {
    const {
      trigger,
      children,
      placement,
      modifiers,
      showArrow,
      dropdownMenuContainerEventHandlers,
      menuState: { isOpen, closeMenu, openMenu },
    } = this.props;
    const childrenFnc =
      typeof children === "function" ? children : () => children;
    return (
      <Manager>
        <Reference>
          {({ ref }: Ref) =>
            React.cloneElement(
              trigger({
                closeMenu,
                openMenu,
              }),
              {
                "aria-haspopup": true,
                "aria-expanded": isOpen,
                type: "button",
                ...this.menuTriggerEventHandlers(),
                ref: (node) => {
                  ref(node);
                  this.setTriggerRef(node);
                },
              }
            )
          }
        </Reference>
        {isOpen && (
          <Popper placement={placement} modifiers={modifiers}>
            {(popperProps) => (
              <>
                <DropdownMenuContainer
                  {...popperProps}
                  placement={placement}
                  showArrow={showArrow}
                  {...this.menuEventHandlers()}
                  ref={(node) => {
                    if (typeof popperProps.ref === "function") {
                      popperProps.ref(node);
                    }
                    this.setMenuRef(node);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.target.focus();
                  }}
                  {...dropdownMenuContainerEventHandlers({
                    openMenu,
                    closeMenu,
                  })}
                >
                  <PopperArrow
                    {...popperProps.arrowProps}
                    placement={placement}
                    ref={popperProps.arrowProps.ref}
                    backgroundColor="white"
                    borderColor="white"
                  />
                  <DetectOutsideClick
                    onClick={this.handleOutsideClick}
                    clickRef={[this.menuRef, this.triggerRef]}
                  />
                  {childrenFnc({
                    closeMenu,
                    openMenu,
                  })}
                </DropdownMenuContainer>
              </>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

// @ts-ignore
StatelessNavBarDropdownMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool,
    openMenu: PropTypes.func,
    closeMenu: PropTypes.func,
    toggleMenu: PropTypes.func,
  }).isRequired,
  showArrow: PropTypes.bool,
  placement: PropTypes.oneOf(["bottom-start", "right-start"]),
  modifiers: PropTypes.shape({}),
  triggerTogglesMenuState: PropTypes.bool,
  dropdownMenuContainerEventHandlers: PropTypes.func,
};
// @ts-ignore
StatelessNavBarDropdownMenu.defaultProps = {
  showArrow: true,
  placement: "bottom-start",
  modifiers: null,
  triggerTogglesMenuState: true,
  dropdownMenuContainerEventHandlers: () => {},
};

const NavBarDropdownMenu = withMenuState(StatelessNavBarDropdownMenu);

// @ts-ignore
NavBarDropdownMenu.defaultProps = {
  showDelay: "0",
  hideDelay: "100",
};

export default NavBarDropdownMenu;
