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
    const { tabsRef, tabRefs } = this.props;
    const rightMarker = tabsRef.current.scrollLeft + tabsRef.current.offsetWidth - this.indicatorWidth;
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
    const { tabsRef, tabRefs } = this.props;
    const leftMarker = tabsRef.current.scrollLeft + this.indicatorWidth;
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
    const { tabRefs, tabsRef } = this.props;

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
        tabsRef.current.offsetWidth;
      this.setScrollLeftState(scrollLeft);
    }
  }

  applyScrollLeft() {
    const { tabsRef } = this.props;
    const { scrollLeft } = this.state;
    tabsRef.current.scrollLeft = scrollLeft;
  }

  handleScroll() {
    const { tabsRef } = this.props;
    if (tabsRef.current) {
      this.setState({
        scrollLeft: tabsRef.current.scrollLeft
      });
    }
  }

  render() {
    const { scrollLeft } = this.state;
    const { children } = this.props;

    return (
      <>
        {children({
          scrollLeft,
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
  tabsRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

TabScrollManager.defaultProps = {
  tabRefs: undefined,
  tabsRef: undefined
};

export default TabScrollManager;
