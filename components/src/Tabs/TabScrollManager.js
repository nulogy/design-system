import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";
import { Icon } from "../Icon";
import { TabFocusManager } from ".";

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
    this.contentHiddenLeft = this.contentHiddenLeft.bind(this);
    this.contentHiddenRight = this.contentHiddenRight.bind(this);
  }

  handleIndicatorClick(side) {
    if (side === "right") {
      const lastVisibleTab = this.findLastVisibleTab();
      const scrollLeft = this.getScrollLeftValueByTabIndex(lastVisibleTab) - this.indicatorWidth;
      this.setScrollLeftState(scrollLeft);
    } else {
      const firstVisibleTab = this.findFirstVisibleTab();
      const scrollLeft =
        this.getScrollLeftValueByTabIndex(firstVisibleTab) +
        this.indicatorWidth +
        this.props.tabRefs[firstVisibleTab].offsetWidth -
        this.props.tabsRef.current.offsetWidth;
      this.setScrollLeftState(scrollLeft);
    }
  }

  findLastVisibleTab() {
    const rightMarker =
      this.props.tabsRef.current.scrollLeft + this.props.tabsRef.current.offsetWidth - this.indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < this.props.tabRefs.length; i++) {
      scrollLeftSum = scrollLeftSum + this.props.tabRefs[i].offsetWidth;
      if (rightMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  findFirstVisibleTab() {
    const leftMarker = this.props.tabsRef.current.scrollLeft + this.indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < this.props.tabRefs.length; i++) {
      scrollLeftSum = scrollLeftSum + this.props.tabRefs[i].offsetWidth;
      if (leftMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  getScrollLeftValueByTabIndex(index) {
    let scrollLeftSum = 0;
    for (let i = 0; i < index; i++) {
      scrollLeftSum = scrollLeftSum + this.props.tabRefs[i].offsetWidth;
    }
    return scrollLeftSum;
  }

  setScrollLeftState(scrollLeft) {
    this.setState({ scrollLeft: scrollLeft }, this.applyScrollLeft);
  }

  applyScrollLeft() {
    this.props.tabsRef.current.scrollLeft = this.state.scrollLeft;
  }

  handleScroll() {
    if (this.props.tabsRef.current) {
      this.setState({
        scrollLeft: this.props.tabsRef.current.scrollLeft
      });
    }
  }

  contentHiddenRight() {
    if (!this.props.tabsRef.current) {
      return false;
    }
    return this.state.scrollLeft + this.props.tabsRef.current.offsetWidth < this.props.tabsRef.current.scrollWidth;
  }

  contentHiddenLeft() {
    if (!this.props.tabsRef.current) {
      return false;
    }
    return (
      this.state.scrollLeft !== 0 && this.props.tabsRef.current.offsetWidth < this.props.tabsRef.current.scrollWidth
    );
  }

  handleTabClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const { scrollLeft } = this.state;

    return (
      <>
        {this.props.children({
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

export default TabScrollManager;
