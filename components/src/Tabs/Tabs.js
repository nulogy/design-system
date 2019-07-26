import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";

const TabContainer = styled.div({
  display: "flex",
  whiteSpace: "nowrap",
  overflowX: "scroll",
  position: "relative",
  "&:before": {
    content: "''",
    backgroundColor: theme.colors.grey,
    height: "1px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

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
    const { children, fitted } = this.props;
    const { selectedIndex } = this.state;

    return (
      <TabContainer>
        {React.Children.map(children, (tab, index) =>
          React.cloneElement(tab, {
            onClick: this.props.selectedIndex
              ? tab.props.onClick
              : () => {
                  this.handleTabClick(index);
                },
            index: index,
            selected: index === selectedIndex ? true : false,
            fullWidth: fitted
          })
        )}
      </TabContainer>
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
