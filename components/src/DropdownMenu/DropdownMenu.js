import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick, withMenuState } from "../utils";
import { IconicButton } from "../Button";
import DropdownMenuContainer from "./DropdownMenuContainer";
import { deprecatedProp } from "../utils/deprecatedProp";

const DEFAULT_POPPER_MODIFIERS = {
  preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" }
};

const transformPropsToModifiers = ({ boundariesElement }) => ({
  ...DEFAULT_POPPER_MODIFIERS,
  boundariesElement
});

/* eslint-disable react/destructuring-assignment */
class StatelessDropdownMenu extends React.Component {
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
      onClick: () => this.props.menuState.toggleMenu()
    };
  }

  menuEventHandlers() {
    return {
      onBlur: () => this.props.menuState.closeMenu(false),
      onFocus: () => this.props.menuState.openMenu(false),
      onClick: () => this.props.menuState.openMenu(false)
    };
  }

  handleOutsideClick() {
    this.props.menuState.closeMenu(false);
  }

  render() {
    const {
      trigger,
      children,
      disabled,
      backgroundColor,
      placement,
      modifiers,
      showArrow,
      className,
      id,
      menuState: { isOpen, closeMenu, openMenu },
      boundariesElement
    } = this.props;
    const childrenFnc = typeof children === "function" ? children : () => children;
    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            React.cloneElement(
              trigger({
                closeMenu,
                openMenu,
                isOpen
              }),
              {
                "aria-haspopup": true,
                "aria-expanded": isOpen,
                type: "button",
                disabled: disabled ? true : null,
                "aria-label": isOpen ? "Close menu" : "Open menu",
                ...this.menuTriggerEventHandlers(),
                ref: node => {
                  ref(node);
                  this.setTriggerRef(node);
                }
              }
            )
          }
        </Reference>
        {isOpen && (
          <Popper placement={false} modifiers={modifiers || transformPropsToModifiers({ boundariesElement })}>
            {popperProps => (
              <DropdownMenuContainer
                className={className}
                id={id}
                onMouseDown={e => {
                  e.preventDefault();
                  e.target.focus();
                }}
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
                    closeMenu();
                    e.stopPropagation();
                  },
                  openMenu: e => {
                    openMenu();
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

const DropdownMenu = withMenuState(StatelessDropdownMenu);

DropdownMenu.propTypes = {
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultOpen: PropTypes.bool,
  modifiers: deprecatedProp(PropTypes.shape({}), "boundariesElement"),
  boundariesElement: PropTypes.string
};

DropdownMenu.defaultProps = {
  showDelay: "100",
  hideDelay: "200",
  defaultOpen: false,
  modifiers: undefined,
  boundariesElement: "viewport"
};

StatelessDropdownMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool,
    openMenu: PropTypes.func,
    closeMenu: PropTypes.func,
    toggleMenu: PropTypes.func
  }).isRequired,
  disabled: PropTypes.bool,
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
  ...DropdownMenu.propTypes
};

StatelessDropdownMenu.defaultProps = {
  disabled: false,
  className: undefined,
  id: undefined,
  trigger: () => <IconicButton icon="more" />,
  backgroundColor: undefined,
  showArrow: true,
  placement: "bottom-start",
  ...DropdownMenu.defaultProps
};

export default DropdownMenu;
