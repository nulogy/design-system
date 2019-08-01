import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import theme from "../theme";
import TabFocusManager from "./TabFocusManager";
import TabScrollManager from "./TabScrollManager";
import TabScrollIndicators from "./TabScrollIndicators";
import ReactResizeDetector from "react-resize-detector";

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

    this.tabContainerRef = React.createRef();
    this.tabRefs = [];
    this.handleTabClick = this.handleTabClick.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  onResize() {
    this.forceUpdate();
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
      <TabScrollManager tabContainerRef={this.tabContainerRef} tabRefs={this.tabRefs}>
        {({ handleScroll, handleIndicatorClick }) => (
          <TabFocusManager tabRefs={this.tabRefs}>
            {({ onKeyDown, setFocusToTab, focusedIndex }) => (
              <>
                <TabScrollIndicators tabContainerRef={this.tabContainerRef} onIndicatorClick={handleIndicatorClick} />
                <TabContainer onKeyDown={onKeyDown} onScroll={handleScroll} ref={this.tabContainerRef}>
                  <ReactResizeDetector handleWidth onResize={this.onResize} />
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
                </TabContainer>
              </>
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
