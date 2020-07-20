import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import smoothscroll from "smoothscroll-polyfill";
import TabScrollIndicator from "./TabScrollIndicator";

const TabScrollIndicatorContainer = styled.div(({ width, theme }) => ({
  position: "absolute",
  width,
  height: theme.space.x5
}));

class TabScrollIndicators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentHiddenLeft: this.contentHiddenLeft(),
      contentHiddenRight: this.contentHiddenRight()
    };

    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.getScrollLeftValueByTabIndex = this.getScrollLeftValueByTabIndex.bind(this);
    this.contentHiddenLeft = this.contentHiddenLeft.bind(this);
    this.contentHiddenRight = this.contentHiddenRight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.conditionallyUpdateState();
    smoothscroll.polyfill();
  }

  getScrollLeftValueByTabIndex(index) {
    const { tabRefs } = this.props;
    let scrollLeftSum = 0;
    for (let i = 0; i < index; i += 1) {
      scrollLeftSum += tabRefs[i].offsetWidth;
    }
    return scrollLeftSum;
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

  findLastVisibleTab() {
    const { tabContainerRef, tabRefs, indicatorWidth } = this.props;
    const rightMarker = tabContainerRef.current.scrollLeft + tabContainerRef.current.offsetWidth - indicatorWidth;
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
    const { tabContainerRef, tabRefs, indicatorWidth } = this.props;
    const leftMarker = tabContainerRef.current.scrollLeft + indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < tabRefs.length; i += 1) {
      scrollLeftSum += tabRefs[i].offsetWidth;
      if (leftMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  handleScroll() {
    this.conditionallyUpdateState();
  }

  handleResize() {
    this.setState({
      contentHiddenLeft: this.contentHiddenLeft(),
      contentHiddenRight: this.contentHiddenRight()
    });
  }

  conditionallyUpdateState() {
    const { contentHiddenLeft, contentHiddenRight } = this.state;
    const currentContentHiddenLeft = this.contentHiddenLeft();
    const currentContentHiddenRight = this.contentHiddenRight();

    if (currentContentHiddenLeft !== contentHiddenLeft) {
      this.setState({ contentHiddenLeft: currentContentHiddenLeft });
    }

    if (currentContentHiddenRight !== contentHiddenRight) {
      this.setState({ contentHiddenRight: currentContentHiddenRight });
    }
  }

  handleIndicatorClick(side) {
    const { tabRefs, tabContainerRef, indicatorWidth } = this.props;

    if (side === "right") {
      const lastVisibleTab = this.findLastVisibleTab();
      const scrollLeft = this.getScrollLeftValueByTabIndex(lastVisibleTab) - indicatorWidth;
      this.applyScrollLeft(scrollLeft);
    } else {
      const firstVisibleTab = this.findFirstVisibleTab();
      const scrollLeft =
        this.getScrollLeftValueByTabIndex(firstVisibleTab) +
        indicatorWidth +
        tabRefs[firstVisibleTab].offsetWidth -
        tabContainerRef.current.offsetWidth;
      this.applyScrollLeft(scrollLeft);
    }
  }

  applyScrollLeft(scrollLeft) {
    const { tabContainerRef } = this.props;
    tabContainerRef.current.scroll({ left: scrollLeft, behavior: "smooth" });
  }

  render() {
    const { tabContainerRef, indicatorWidth, children } = this.props;
    const { contentHiddenLeft, contentHiddenRight } = this.state;

    return (
      <>
        <TabScrollIndicatorContainer width={tabContainerRef.current ? tabContainerRef.current.offsetWidth : 0}>
          {contentHiddenLeft && (
            <TabScrollIndicator width={indicatorWidth} side="left" onClick={this.handleIndicatorClick} />
          )}
          {contentHiddenRight && (
            <TabScrollIndicator width={indicatorWidth} side="right" onClick={this.handleIndicatorClick} />
          )}
        </TabScrollIndicatorContainer>
        {children({ handleScroll: this.handleScroll, handleResize: this.handleResize })}
      </>
    );
  }
}

TabScrollIndicators.propTypes = {
  children: PropTypes.func.isRequired,
  tabRefs: PropTypes.arrayOf(PropTypes.shape({ offsetWidth: PropTypes.number })),
  tabContainerRef: PropTypes.shape({ current: PropTypes.object }),
  indicatorWidth: PropTypes.number
};

TabScrollIndicators.defaultProps = {
  tabRefs: undefined,
  tabContainerRef: undefined,
  indicatorWidth: 40
};

export default TabScrollIndicators;
