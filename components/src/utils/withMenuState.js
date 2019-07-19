import React from "react";
import PropTypes from "prop-types";
import { keyCodes } from "../constants";

class MenuState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: this.props.defaultOpen
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

  setMenuState(newState, skipTimer = true) {
    const { showDelay, hideDelay } = this.props;

    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState({ isOpen: newState }),
      skipTimer,
      newState ? showDelay : hideDelay
    );
  }

  toggleMenu(skipTimer = true) {
    const { isOpen } = this.state;
    const { showDelay, hideDelay } = this.props;

    this.clearScheduled();
    this.conditionallyApplyDelay(
      () => this.setState(prevState => ({ isOpen: !prevState.isOpen })),
      skipTimer,
      isOpen ? hideDelay : showDelay
    );
  }

  clearScheduled() {
    clearTimeout(this.timeoutID);
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
      toggleMenu: this.toggleMenu,
      handleMenuKeydown: this.handleKeyDown,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu
    });
  }
}

MenuState.propTypes = {
  children: PropTypes.func.isRequired,
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultOpen: PropTypes.bool
};

MenuState.defaultProps = {
  showDelay: 0,
  hideDelay: 0,
  defaultOpen: false
};

const withMenuState = MenuComponentWithoutState => {
  const MenuComponent = ({ showDelay, hideDelay, defaultOpen, ...props }) => (
    <MenuState showDelay={showDelay} hideDelay={hideDelay} defaultOpen={defaultOpen}>
      {menuState => <MenuComponentWithoutState menuState={menuState} {...props} />}
    </MenuState>
  );
  MenuComponent.propTypes = {
    showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultOpen: PropTypes.bool
  };

  MenuComponent.defaultProps = {
    showDelay: 0,
    hideDelay: 0,
    defaultOpen: false
  };

  return MenuComponent;
};

export default withMenuState;
