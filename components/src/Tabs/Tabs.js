import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import theme from "../theme";
import TabFocusManager from "./TabFocusManager";
import TabScrollManager from "./TabScrollManager";
import TabScrollIndicator from "./TabScrollIndicator";

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

    const { selectedIndex } = this.props;

    this.state = {
      selectedIndex: selectedIndex || null
    };

    this.tabsRef = React.createRef();
    this.tabRefs = [];
    this.handleTabClick = this.handleTabClick.bind(this);
    this.contentHiddenLeft = this.contentHiddenLeft.bind(this);
    this.contentHiddenRight = this.contentHiddenRight.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  contentHiddenRight() {
    if (!this.tabsRef.current) {
      return false;
    }
    return this.tabsRef.current.scrollLeft + this.tabsRef.current.offsetWidth < this.tabsRef.current.scrollWidth;
  }

  contentHiddenLeft() {
    if (!this.tabsRef.current) {
      return false;
    }
    return this.tabsRef.current.scrollLeft !== 0 && this.tabsRef.current.offsetWidth < this.tabsRef.current.scrollWidth;
  }

  handleTabClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const { selectedIndex: controlledSelectedIndex, children, fitted } = this.props;
    const { selectedIndex } = this.state;

    return (
      <TabScrollManager tabsRef={this.tabsRef} tabRefs={this.tabRefs}>
        {({ scrollLeft, handleScroll, handleIndicatorClick }) => (
          <TabFocusManager tabRefs={this.tabRefs}>
            {({ onKeyDown, setFocusToTab, focusedIndex }) => (
              <TabContainer onKeyDown={onKeyDown} onScroll={handleScroll} ref={this.tabsRef}>
                {this.contentHiddenLeft() && (
                  <TabScrollIndicator
                    tabIndex={-1}
                    side="left"
                    scrollLeft={scrollLeft}
                    onClick={handleIndicatorClick}
                  />
                )}
                {React.Children.map(children, (tab, index) =>
                  React.cloneElement(tab, {
                    onClick: controlledSelectedIndex
                      ? tab.props.onClick
                      : () => {
                          setFocusToTab(index);
                          this.handleTabClick(index);
                        },
                    onFocus: e => {
                      e.stopPropagation();
                    },
                    index,
                    tabIndex: index === focusedIndex ? 0 : -1,
                    selected: index === selectedIndex,
                    fullWidth: fitted,
                    ref: ref => {
                      this.tabRefs[index] = ref;
                    }
                  })
                )}
                {this.contentHiddenRight() && (
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
  selectedIndex: PropTypes.number,
  fitted: PropTypes.bool
};

Tabs.defaultProps = {
  children: null,
  selectedIndex: undefined,
  fitted: false
};

export default Tabs;
