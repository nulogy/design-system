import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import theme from "../theme";
import TabScrollIndicator from "./TabScrollIndicator";

const TabScrollIndicatorContainer = styled.div(({ width }) => ({
  position: "absolute",
  width: width,
  height: theme.space.x5
}));

class TabScrollIndicators extends React.Component {
  constructor(props) {
    super(props);

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

  render() {
    const { tabContainerRef, onIndicatorClick } = this.props;

    return (
      <TabScrollIndicatorContainer width={tabContainerRef.current ? tabContainerRef.current.offsetWidth : 0}>
        {this.contentHiddenLeft() && <TabScrollIndicator tabIndex={-1} side="left" onClick={onIndicatorClick} />}
        {this.contentHiddenRight() && <TabScrollIndicator tabIndex={-1} side="right" onClick={onIndicatorClick} />}
      </TabScrollIndicatorContainer>
    );
  }
}

TabScrollIndicators.propTypes = {
  onIndicatorClick: PropTypes.func,
  tabContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

TabScrollIndicators.defaultProps = {
  onIndicatorClick: () => {},
  tabContainerRef: undefined
};

export default TabScrollIndicators;
