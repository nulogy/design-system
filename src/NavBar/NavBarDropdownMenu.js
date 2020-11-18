import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick, withMenuState, PopperArrow } from "../utils";
import DropdownMenuContainer from "../DropdownMenu/DropdownMenuContainer";

/* eslint-disable react/destructuring-assignment */
class StatelessNavBarDropdownMenu extends React.Component {
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
      onClick: () => this.handleTriggerClick(false),
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
          {({ ref }) =>
            React.cloneElement(
              trigger({
                closeMenu,
                openMenu,
                isOpen,
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
                    popperProps.ref(node);
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
                    backgroundColor="whiteGrey"
                    borderColor="whiteGrey"
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

StatelessNavBarDropdownMenu.defaultProps = {
  showArrow: true,
  placement: "bottom-start",
  modifiers: null,
  triggerTogglesMenuState: true,
  dropdownMenuContainerEventHandlers: () => {},
};

const NavBarDropdownMenu = withMenuState(StatelessNavBarDropdownMenu);

NavBarDropdownMenu.propTypes = {
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NavBarDropdownMenu.defaultProps = {
  showDelay: "0",
  hideDelay: "100",
};

export default NavBarDropdownMenu;
