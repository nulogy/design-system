import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import ReactResizeDetector from "react-resize-detector";
import TabFocusManager from "./TabFocusManager";
import TabScrollIndicators from "./TabScrollIndicators";

const TabContainer = styled.div(({ theme }) => ({
  display: "flex",
  whiteSpace: "nowrap",
  overflowX: "scroll",
  overflowY: "hidden",
  marginBottom: theme.space.x1,
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
}));

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const { defaultSelectedIndex } = this.props;

    this.state = {
      selectedIndex: defaultSelectedIndex === null ? null : defaultSelectedIndex
    };

    this.tabContent = [];
    this.tabContainerRef = React.createRef();
    this.tabRefs = [];
    this.handleTabClick = this.handleTabClick.bind(this);
    this.getTabs = this.getTabs.bind(this);
  }

  getSelectedIndex() {
    const { selectedIndex: controlledSelectedIndex } = this.props;
    const { selectedIndex: uncontrolledSelectedIndex } = this.state;

    return controlledSelectedIndex === undefined ? uncontrolledSelectedIndex : controlledSelectedIndex;
  }

  getTabs(setFocusToTab, focusedIndex, handleArrowNavigation) {
    const { fitted, children, onTabClick } = this.props;
    const selectedIndex = this.getSelectedIndex();

    const tabs = React.Children.map(children, (tab, index) =>
      React.cloneElement(tab, {
        onClick: e => {
          setFocusToTab(index);
          if (tab.props.onClick) {
            tab.props.onClick(e);
          }
          if (onTabClick) {
            onTabClick(e, index);
          } else {
            this.handleTabClick(index);
          }
        },
        onFocus: e => {
          e.stopPropagation();
        },
        onKeyDown: handleArrowNavigation,
        index,
        tabIndex: index === focusedIndex ? 0 : -1,
        selected: index === selectedIndex,
        "aria-selected": index === selectedIndex,
        fullWidth: fitted,
        ref: ref => {
          this.tabRefs[index] = ref;
        }
      })
    );

    return tabs;
  }

  getTabContent() {
    const { children, renderTabContentOnlyWhenSelected } = this.props;
    const selectedIndex = this.getSelectedIndex();

    const tabContent = React.Children.map(children, (tab, index) => {
      const selected = index === selectedIndex;

      if (renderTabContentOnlyWhenSelected && !selected) {
        return null;
      } else {
        return (
          <div aria-hidden={!selected} hidden={!selected} selected={selected}>
            {tab.props.children}
          </div>
        );
      }
    });
    return tabContent;
  }

  handleTabClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const { className } = this.props;

    return (
      <>
        <TabFocusManager tabRefs={this.tabRefs}>
          {({ handleArrowNavigation, setFocusToTab, focusedIndex }) => (
            <TabScrollIndicators tabRefs={this.tabRefs} tabContainerRef={this.tabContainerRef}>
              {({ handleScroll, handleResize }) => (
                <TabContainer className={className} role="tablist" onScroll={handleScroll} ref={this.tabContainerRef}>
                  <ReactResizeDetector handleWidth onResize={handleResize} />
                  {this.getTabs(setFocusToTab, focusedIndex, handleArrowNavigation)}
                </TabContainer>
              )}
            </TabScrollIndicators>
          )}
        </TabFocusManager>
        {this.getTabContent()}
      </>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selectedIndex: PropTypes.number,
  defaultSelectedIndex: PropTypes.number,
  renderTabContentOnlyWhenSelected: PropTypes.bool,
  fitted: PropTypes.bool,
  onTabClick: PropTypes.func
};

Tabs.defaultProps = {
  children: null,
  className: undefined,
  selectedIndex: undefined,
  defaultSelectedIndex: null,
  renderTabContentOnlyWhenSelected: false,
  fitted: false,
  onTabClick: undefined
};

export default Tabs;
