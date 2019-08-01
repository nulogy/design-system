import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import theme from "../theme";
import TabScrollIndicator from "./TabScrollIndicator";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

const TabScrollIndicatorContainer = styled.div(({ width }) => ({
  position: "absolute",
  width: width,
  height: theme.space.x5
}));

class TabScrollIndicators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollLeft: 0
    };

    this.indicatorWidth = 40;
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.setScrollLeftState = this.setScrollLeftState.bind(this);
    this.getScrollLeftValueByTabIndex = this.getScrollLeftValueByTabIndex.bind(this);
    this.contentHiddenLeft = this.contentHiddenLeft.bind(this);
    this.contentHiddenRight = this.contentHiddenRight.bind(this);
  }

  contentHiddenRight() {
    const { tabContainerRef } = this.props;
    if (!tabContainerRef.current) {
      return false;
    }
    return (
      tabContainerRef.current.scrollLeft + tabContainerRef.current.offsetWidth < tabContainerRef.current.scrollWidth
    );
  }

  contentHiddenLeft() {
    const { tabContainerRef } = this.props;
    if (!tabContainerRef.current) {
      return false;
    }
    return (
      tabContainerRef.current.scrollLeft !== 0 &&
      tabContainerRef.current.offsetWidth < tabContainerRef.current.scrollWidth
    );
  }

  setScrollLeftState(scrollLeft) {
    this.setState({ scrollLeft }, this.applyScrollLeft);
  }

  getScrollLeftValueByTabIndex(index) {
    const { tabRefs } = this.props;
    let scrollLeftSum = 0;
    for (let i = 0; i < index; i += 1) {
      scrollLeftSum += tabRefs[i].offsetWidth;
    }
    return scrollLeftSum;
  }

  findLastVisibleTab() {
    const { tabContainerRef, tabRefs } = this.props;
    const rightMarker = tabContainerRef.current.scrollLeft + tabContainerRef.current.offsetWidth - this.indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < tabRefs.length; i += 1) {
      scrollLeftSum += tabRefs[i].offsetWidth;
      if (rightMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  findFirstVisibleTab() {
    const { tabContainerRef, tabRefs } = this.props;
    const leftMarker = tabContainerRef.current.scrollLeft + this.indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < tabRefs.length; i += 1) {
      scrollLeftSum += tabRefs[i].offsetWidth;
      if (leftMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  handleIndicatorClick(side) {
    const { tabRefs, tabContainerRef } = this.props;

    if (side === "right") {
      const lastVisibleTab = this.findLastVisibleTab();
      const scrollLeft = this.getScrollLeftValueByTabIndex(lastVisibleTab) - this.indicatorWidth;
      this.setScrollLeftState(scrollLeft);
    } else {
      const firstVisibleTab = this.findFirstVisibleTab();
      const scrollLeft =
        this.getScrollLeftValueByTabIndex(firstVisibleTab) +
        this.indicatorWidth +
        tabRefs[firstVisibleTab].offsetWidth -
        tabContainerRef.current.offsetWidth;
      this.setScrollLeftState(scrollLeft);
    }
  }

  applyScrollLeft() {
    const { tabContainerRef } = this.props;
    const { scrollLeft } = this.state;
    tabContainerRef.current.scroll({ left: scrollLeft, behavior: "smooth" });
  }

  render() {
    const { tabContainerRef } = this.props;

    return (
      <TabScrollIndicatorContainer width={tabContainerRef.current ? tabContainerRef.current.offsetWidth : 0}>
        {this.contentHiddenLeft() && <TabScrollIndicator side="left" onClick={this.handleIndicatorClick} />}
        {this.contentHiddenRight() && <TabScrollIndicator side="right" onClick={this.handleIndicatorClick} />}
      </TabScrollIndicatorContainer>
    );
  }
}

TabScrollIndicators.propTypes = {
  tabRefs: PropTypes.arrayOf(PropTypes.shape({ offsetWidth: PropTypes.number })),
  tabContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

TabScrollIndicators.defaultProps = {
  tabRefs: undefined,
  tabContainerRef: undefined
};

export default TabScrollIndicators;
