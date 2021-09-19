// @ts-nocheck
import styled from "styled-components";
import React from "react";
import propTypes from "@styled-system/prop-types";
import ReactResizeDetector from "react-resize-detector";
import { getSubset } from "../utils/subset";
import { Box } from "../Box";
import TabContainer from "./TabContainer";
import FocusManager from "../utils/ts/FocusManager";
import TabScrollIndicators from "./TabScrollIndicators";

export type TabsProps = {
  className?: string;
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  renderTabContentOnlyWhenSelected?: boolean;
  fitted?: boolean;
  onTabClick?: (...args: any[]) => any;
};

export type TabsState = {
  selectedIndex: any;
};

class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props) {
    super(props);
    const { defaultSelectedIndex } = this.props;
    this.state = {
      selectedIndex:
        defaultSelectedIndex === null ? null : defaultSelectedIndex,
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
    return controlledSelectedIndex === undefined
      ? uncontrolledSelectedIndex
      : controlledSelectedIndex;
  }

  getTabs(setFocusToTab, focusedIndex, handleArrowNavigation) {
    const { fitted, children, onTabClick } = this.props;
    const selectedIndex = this.getSelectedIndex();

    return React.Children.map(children, (tab, index) => {
      if (tab) {
        return React.cloneElement(tab, {
          onClick: (e) => {
            setFocusToTab(index);
            if (tab?.props?.onClick) {
              tab?.props?.onClick(e);
            }
            if (onTabClick) {
              onTabClick(e, index);
            } else {
              this.handleTabClick(index);
            }
          },
          onFocus: (e) => {
            e.stopPropagation();
          },
          onKeyDown: handleArrowNavigation,
          index,
          tabIndex: index === focusedIndex ? 0 : -1,
          selected: index === selectedIndex,
          "aria-selected": index === selectedIndex,
          fullWidth: fitted,
          ref: (ref) => {
            this.tabRefs[index] = ref;
          },
        });
      }
    });
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
            {tab?.props?.children}
          </div>
        );
      }
    });
    return tabContent;
  }

  handleTabClick(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  render() {
    const { className } = this.props;
    const spaceProps = getSubset(this.props, propTypes.space);
    return (
      <Box position="relative">
        <FocusManager refs={this.tabRefs}>
          {({ focusedIndex, setFocusedIndex, handleArrowNavigation }) => (
            <TabScrollIndicators
              tabRefs={this.tabRefs}
              tabContainerRef={this.tabContainerRef}
            >
              {({ handleScroll, handleResize }) => (
                <TabContainer
                  className={className}
                  role="tablist"
                  onScroll={handleScroll}
                  ref={this.tabContainerRef}
                  {...spaceProps}
                >
                  <ReactResizeDetector handleWidth onResize={handleResize} />
                  {this.getTabs(
                    setFocusedIndex,
                    focusedIndex,
                    handleArrowNavigation
                  )}
                </TabContainer>
              )}
            </TabScrollIndicators>
          )}
        </FocusManager>
        {this.getTabContent()}
      </Box>
    );
  }
}

Tabs.defaultProps = {
  children: null,
  className: undefined,
  selectedIndex: undefined,
  defaultSelectedIndex: null,
  renderTabContentOnlyWhenSelected: false,
  fitted: false,
  onTabClick: undefined,
};

export default Tabs;
