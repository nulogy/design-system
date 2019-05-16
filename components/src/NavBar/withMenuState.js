import React from "react";
import PropTypes from "prop-types";
import keyCodes from "../Utils";

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

  handleOnClick() {
    this.toggleMenu();
  }

  toggleMenu() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }

  openMenu() {
    this.setState({
      isOpen: true
    });
  }

  closeMenu() {
    this.setState({
      isOpen: false
    });
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

const withMenuState = MenuComponentWithoutState => props => (
  <MenuState>{menuState => <MenuComponentWithoutState menuState={menuState} {...props} />}</MenuState>
);

export { withMenuState };
