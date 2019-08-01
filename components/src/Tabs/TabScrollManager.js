import React from "react";
import PropTypes from "prop-types";

class TabScrollManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollLeft: 0
    };

    this.indicatorWidth = 40;
    this.handleScroll = this.handleScroll.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.setScrollLeftState = this.setScrollLeftState.bind(this);
    this.getScrollLeftValueByTabIndex = this.getScrollLeftValueByTabIndex.bind(this);
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
    tabContainerRef.current.scrollLeft = scrollLeft;
  }

  handleScroll() {
    console.log("handleScroll");
    const { tabContainerRef } = this.props;
    if (tabContainerRef.current) {
      this.setState({
        scrollLeft: tabContainerRef.current.scrollLeft
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <>
        {children({
          handleScroll: this.handleScroll,
          handleIndicatorClick: this.handleIndicatorClick,
          contentHiddenLeft: this.contentHiddenLeft,
          contentHiddenRight: this.contentHiddenRight
        })}
      </>
    );
  }
}

TabScrollManager.propTypes = {
  children: PropTypes.func.isRequired,
  tabRefs: PropTypes.arrayOf(PropTypes.shape({ offsetWidth: PropTypes.number })),
  tabContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

TabScrollManager.defaultProps = {
  tabRefs: undefined,
  tabContainerRef: undefined
};

export default TabScrollManager;
