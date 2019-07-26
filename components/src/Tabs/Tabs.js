import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.selectedIndex || null
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const { children } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onClick: () => {
              this.handleTabClick(index);
            },
            index: index,
            selected: index === selectedIndex ? true : false
          })
        )}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  selectedIndex: PropTypes.number
};

Tabs.defaultProps = {
  children: null,
  selectedIndex: undefined
};

export default Tabs;
