import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick, withMenuState, PopperArrow } from "../utils";
import DropdownMenuContainer from "../DropdownMenu/DropdownMenuContainer";

type MenuState = {
  isOpen?: boolean;
  openMenu?: (skipDelay?: boolean) => void;
  closeMenu?: (skipDelay?: boolean) => void;
  toggleMenu?: (skipDelay?: boolean) => void;
};

type NavBarDropdownMenuProps = {
  children?:
    | React.ReactNode
    | ((props: {
        closeMenu?: (skipDelay?: boolean) => void;
        openMenu?: (skipDelay?: boolean) => void;
      }) => React.ReactNode);
  trigger?: (props: {
    closeMenu?: (skipDelay?: boolean) => void;
    openMenu?: (skipDelay?: boolean) => void;
    isOpen?: boolean;
  }) => React.ReactElement;
  menuState?: MenuState;
  showArrow?: boolean;
  placement?: "bottom-start" | "right-start" | "left-start";
  modifiers?: any;
  triggerTogglesMenuState?: boolean;
  dropdownMenuContainerEventHandlers?: (props: {
    openMenu?: (skipDelay?: boolean) => void;
    closeMenu?: (skipDelay?: boolean) => void;
  }) => React.HTMLAttributes<HTMLElement>;
};

class StatelessNavBarDropdownMenuClass extends React.Component<NavBarDropdownMenuProps, any> {
  menuRef: any;
  triggerRef: any;
}

type Ref = {
  ref: any;
};

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

    const childrenFnc = typeof children === "function" ? children : () => children;
    return (
      <Manager>
        <Reference>
          {({ ref }: Ref) =>
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
            {(popperProps) => {
              const { ref: popperRef, style, placement: popperPlacement } = popperProps;
              return (
                <>
                  <DropdownMenuContainer
                    dataPlacement={popperPlacement}
                    style={style}
                    placement={placement}
                    showArrow={showArrow}
                    {...this.menuEventHandlers()}
                    {...({
                      ref: (node: HTMLElement | null) => {
                        if (typeof popperRef === "function") {
                          popperRef(node);
                        }
                        this.setMenuRef(node);
                      },
                    } as any)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      (e.target as HTMLElement).focus();
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
                    <DetectOutsideClick onClick={this.handleOutsideClick} clickRef={[this.menuRef, this.triggerRef]} />
                    {childrenFnc({
                      closeMenu,
                      openMenu,
                    })}
                  </DropdownMenuContainer>
                </>
              );
            }}
          </Popper>
        )}
      </Manager>
    );
  }
}

// @ts-expect-error - defaultProps is not recognized on functional components in newer React types
StatelessNavBarDropdownMenu.defaultProps = {
  showArrow: true,
  placement: "bottom-start",
  modifiers: null,
  triggerTogglesMenuState: true,
  dropdownMenuContainerEventHandlers: () => {},
};

const NavBarDropdownMenu = withMenuState(StatelessNavBarDropdownMenu);

// @ts-expect-error - defaultProps is not recognized on functional components in newer React types
NavBarDropdownMenu.defaultProps = {
  showDelay: "0",
  hideDelay: "100",
};

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export default NavBarDropdownMenu;
