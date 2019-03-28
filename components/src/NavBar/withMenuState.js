import React from "react";
import PropTypes from "prop-types";

class MenuState extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleOnClick() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 27:
        this.setState({
          isOpen: false,
        });
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
    });
  }
}

MenuState.propTypes = {
  children: PropTypes.func.isRequired,
};

const withMenuState = MenuComponentWithoutState => props => (
  <MenuState>
    {
      menuState => <MenuComponentWithoutState menuState={ menuState } { ...props } />
    }
  </MenuState>
);

export { withMenuState };
