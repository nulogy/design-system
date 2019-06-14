import React from "react";
import { Icon } from "../Icon";
import theme from "../theme";

const ScrollIndicatorTop = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: "calc(50% - 32px)",
      right: "calc(50% - 32px)",
      height: "32px",
      width: "64px",
      background: theme.colors.lightGrey,
      opacity: 0.8,
      borderRadius: "0 0 16px 16px",
      pointerEvents: "none"
    }}
  >
    <Icon style={{ display: "block", margin: "0 auto" }} color="darkGrey" icon="upArrow" />
  </div>
);

const ScrollIndicatorBottom = () => (
  <div
    style={{
      position: "absolute",
      bottom: 1,
      left: "calc(50% - 32px)",
      right: "calc(50% - 32px)",
      height: "32px",
      width: "64px",
      background: theme.colors.lightGrey,
      opacity: 0.8,
      borderRadius: "16px 16px 0 0",
      pointerEvents: "none"
    }}
  >
    <Icon style={{ display: "block", margin: "8px auto" }} color="darkGrey" icon="downArrow" />
  </div>
);

class ScrollIndicators extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollTop: 0
    };
    this.menuRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if (this.menuRef.current) {
      this.setState({
        scrollTop: this.menuRef.current.scrollTop
      });
    }
  }

  contentHiddenBelow() {
    if (this.menuRef.current) {
      return this.state.scrollTop + this.menuRef.current.offsetHeight < this.menuRef.current.scrollHeight;
    } else {
      return false;
    }
  }

  contentHiddenAbove() {
    if (this.menuRef.current) {
      return this.state.scrollTop !== 0 && this.menuRef.current.offsetHeight < this.menuRef.current.scrollHeight;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.contentHiddenAbove() && <ScrollIndicatorTop />}
        {React.cloneElement(this.props.children, {
          ref: this.menuRef,
          onScroll: this.handleScroll
        })}
        {this.contentHiddenBelow() && <ScrollIndicatorBottom />}
      </div>
    );
  }
}

export default ScrollIndicators;
