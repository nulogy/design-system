import React from "react";
import PropTypes from "prop-types";
import { keyCodes } from "../constants";

class MenuState extends React.Component {
  constructor(props) {
    super(props);

    const { defaultOpen } = this.props;

    this.state = {
      isOpen: defaultOpen
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
      () => this.setState(prevState => ({ isOpen: !prevState.isOpen })),
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

const withMenuState = MenuComponent => {
  const MenuComponentWithState = ({ showDelay, hideDelay, defaultOpen, ...props }) => (
    <MenuState showDelay={showDelay} hideDelay={hideDelay} defaultOpen={defaultOpen}>
      {menuComponentProps => <MenuComponent menuState={menuComponentProps} {...props} />}
    </MenuState>
  );
  MenuComponentWithState.propTypes = {
    showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultOpen: PropTypes.bool
  };

  MenuComponentWithState.defaultProps = {
    showDelay: 0,
    hideDelay: 0,
    defaultOpen: false
  };

  return MenuComponentWithState;
};

export default withMenuState;
