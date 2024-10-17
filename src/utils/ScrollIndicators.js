import React from "react";
import { Icon } from "../Icon";
import styled from "styled-components";
import { position } from "styled-system";

const ScrollIndicatorWrapper = styled.div(
  ({ theme }) => ({
    position: "absolute",
    left: `calc(50% - ${theme.space.x3})`,
    right: `calc(50% - ${theme.space.x3})`,
    height: theme.space.x3,
    width: theme.space.x6,
    background: theme.colors.lightGrey,
    opacity: 0.8,
    borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
    pointerEvents: "none",
  }),
  position
);

const ScrollIndicatorTop = () => {
  return (
    <ScrollIndicatorWrapper top={0}>
      <Icon margin="0 auto" display="block" color="darkGrey" icon="upArrow" />
    </ScrollIndicatorWrapper>
  );
};

const ScrollIndicatorBottom = () => (
  <ScrollIndicatorWrapper bottom={1}>
    <Icon display="block" margin="0 auto" color="darkGrey" icon="downArrow" />
  </ScrollIndicatorWrapper>
);

/* eslint-disable react/destructuring-assignment */
class ScrollIndicators extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollTop: 0,
    };
    this.menuRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.offsetHeight = null;
    this.scrollHeight = null;
  }

  componentDidMount() {
    this.offsetHeight = this.menuRef.current.offsetHeight;
    this.scrollHeight = this.menuRef.current.scrollHeight;
  }

  handleScroll() {
    if (this.menuRef.current) {
      this.setState({
        scrollTop: this.menuRef.current.scrollTop,
      });
    }
  }

  contentHiddenBelow() {
    return this.state.scrollTop + this.offsetHeight < this.scrollHeight;
  }

  contentHiddenAbove() {
    return this.state.scrollTop !== 0 && this.offsetHeight < this.scrollHeight;
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.contentHiddenAbove() && <ScrollIndicatorTop />}
        {React.cloneElement(this.props.children, {
          ref: this.menuRef,
          onScroll: this.handleScroll,
        })}
        {this.contentHiddenBelow() && <ScrollIndicatorBottom />}
      </div>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

export default ScrollIndicators;
