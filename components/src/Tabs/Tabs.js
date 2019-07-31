import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";
import { Icon } from "../Icon";
import { TabFocusManager, TabScrollManager, TabScrollIndicator } from ".";

const TabContainer = styled.div({
  display: "flex",
  whiteSpace: "nowrap",
  overflowX: "scroll",
  overflowY: "hidden",
  "::-webkit-scrollbar": {
    display: "none"
  },
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
      selectedIndex: this.props.selectedIndex || null,
      scrollLeft: 0
    };

    this.tabsRef = React.createRef();
    this.tabRefs = [];
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
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
      <TabScrollManager tabsRef={this.tabsRef} tabRefs={this.tabRefs}>
        {({ scrollLeft, handleScroll, handleIndicatorClick, contentHiddenLeft, contentHiddenRight }) => (
          <TabFocusManager tabRefs={this.tabRefs}>
            {({ onKeyDown, setFocusToTab, focusedIndex }) => (
              <TabContainer onKeyDown={onKeyDown} onScroll={handleScroll} ref={this.tabsRef}>
                {contentHiddenLeft() && (
                  <TabScrollIndicator
                    tabIndex={-1}
                    side="left"
                    scrollLeft={scrollLeft}
                    onClick={handleIndicatorClick}
                  />
                )}
                {React.Children.map(children, (tab, index) =>
                  React.cloneElement(tab, {
                    onClick: this.props.selectedIndex
                      ? tab.props.onClick
                      : () => {
                          setFocusToTab(index);
                          this.handleTabClick(index);
                        },
                    onFocus: e => {
                      e.stopPropagation();
                    },
                    index: index,
                    tabIndex: index === focusedIndex ? 0 : -1,
                    selected: index === selectedIndex ? true : false,
                    fullWidth: fitted,
                    ref: ref => (this.tabRefs[index] = ref)
                  })
                )}
                {contentHiddenRight() && (
                  <TabScrollIndicator
                    tabIndex={-1}
                    side="right"
                    scrollLeft={scrollLeft}
                    onClick={handleIndicatorClick}
                  />
                )}
              </TabContainer>
            )}
          </TabFocusManager>
        )}
      </TabScrollManager>
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
