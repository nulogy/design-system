import React from "react";
import PropTypes from "prop-types";

class MenuState extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { children: renderMenu } = this.props;

    return renderMenu({
      isOpen,
      handleMenuToggle: this.handleOnClick,
    });
  }
}

MenuState.propTypes = {
  children: PropTypes.func.isRequired,
};

const withMenuState = MenuComponentWithoutState => ({
  ...props
}) => (
  <MenuState>
    {
      menuState => <MenuComponentWithoutState menuState={ menuState } { ...props } />
    }
  </MenuState>
);

export { withMenuState };
