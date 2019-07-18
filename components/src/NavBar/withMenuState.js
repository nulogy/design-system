import React from "react";
import PropTypes from "prop-types";
import { keyCodes } from "../constants";

class MenuState extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.handleOnClick = this.handleOnClick.bind(this);
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
  }

  clearScheduled() {
    clearTimeout(this.timeoutID);
  }

  setMenuState(newState, skipTimer = true) {
    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState({ isOpen: newState }),
      skipTimer,
      newState ? this.props.showDelay : this.props.hideDelay
    );
  }

  toggleMenu(skipTimer = true) {
    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState(prevState => ({ isOpen: !prevState.isOpen })),
      skipTimer,
      this.state.isOpen ? this.props.hideDelay : this.props.showDelay
    );
  }

  conditionallyApplyDelay(fnc, skipTimer, delay) {
    if (!skipTimer) {
      this.timeoutID = setTimeout(fnc, delay);
    } else {
      fnc();
    }
  }

  closeMenu(skipTimer) {
    this.setMenuState(false, skipTimer);
  }

  openMenu(skipTimer) {
    this.setMenuState(true, skipTimer);
  }

  handleOnClick(skipTimer) {
    this.toggleMenu(skipTimer);
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case keyCodes.ESC:
        this.closeMenu();
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
      handleMenuToggle: this.handleOnClick,
      handleMenuKeydown: this.handleKeyDown,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu
    });
  }
}

MenuState.propTypes = {
  children: PropTypes.func.isRequired
};

const withMenuState = MenuComponentWithoutState => (props, showDelay, hideDelay) => (
  <MenuState showDelay={showDelay} hideDelay={hideDelay}>
    {menuState => <MenuComponentWithoutState menuState={menuState} {...props} />}
  </MenuState>
);

export { withMenuState };
