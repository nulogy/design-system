import React from "react";
import { keyCodes } from "../constants";

type WithMenuStateProps = {
  children?: any;
  showDelay?: string | number;
  hideDelay?: string | number;
  defaultOpen?: boolean;
};

class MenuStateInt extends React.Component<WithMenuStateProps, any> {
  timeoutID: any;
}

class MenuState extends MenuStateInt {
  constructor(props) {
    super(props);

    const { defaultOpen } = this.props;

    this.state = {
      isOpen: defaultOpen,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.clearScheduled();
  }

  setMenuState(nextIsOpenState, skipDelay) {
    const { showDelay, hideDelay } = this.props;

    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState({ isOpen: nextIsOpenState }),
      nextIsOpenState ? showDelay : hideDelay,
      skipDelay
    );
  }

  toggleMenu(skipDelay) {
    const { isOpen } = this.state;
    const { showDelay, hideDelay } = this.props;

    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState((prevState) => ({ isOpen: !prevState.isOpen })),
      isOpen ? hideDelay : showDelay,
      skipDelay
    );
  }

  closeMenu(skipDelay) {
    this.setMenuState(false, skipDelay);
  }

  openMenu(skipDelay) {
    this.setMenuState(true, skipDelay);
  }

  clearScheduled() {
    clearTimeout(this.timeoutID);
  }

  conditionallyApplyDelay(fnc, delay, skipDelay = true) {
    if (!skipDelay) {
      this.timeoutID = setTimeout(fnc, delay);
    } else {
      fnc();
    }
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case keyCodes.ESC:
        this.closeMenu(false);
        break;
      default:
        break;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { children: renderMenu } = this.props;

    return renderMenu({
      isOpen,
      toggleMenu: this.toggleMenu,
      handleMenuKeydown: this.handleKeyDown,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
    });
  }
}

const withMenuState = (MenuComponent) => {
  const MenuComponentWithState = ({ showDelay, hideDelay, defaultOpen, ...props }) => (
    <MenuState showDelay={showDelay} hideDelay={hideDelay} defaultOpen={defaultOpen}>
      {(menuComponentProps) => <MenuComponent menuState={menuComponentProps} {...props} />}
    </MenuState>
  );

  return MenuComponentWithState;
};

export default withMenuState;
