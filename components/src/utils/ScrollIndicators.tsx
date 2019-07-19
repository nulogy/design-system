import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import theme from "../theme";

const ScrollIndicatorTop = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: `calc(50% - ${theme.space.x3})`,
      right: `calc(50% - ${theme.space.x3})`,
      height: theme.space.x3,
      width: theme.space.x6,
      background: theme.colors.lightGrey,
      opacity: 0.8,
      borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
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
      left: `calc(50% - ${theme.space.x3})`,
      right: `calc(50% - ${theme.space.x3})`,
      height: theme.space.x3,
      width: theme.space.x6,
      background: theme.colors.lightGrey,
      opacity: 0.8,
      borderRadius: `${theme.radii.medium} ${theme.radii.medium} 0 0`,
      pointerEvents: "none"
    }}
  >
    <Icon style={{ display: "block", margin: "0 auto" }} color="darkGrey" icon="downArrow" />
  </div>
);

/* eslint-disable react/destructuring-assignment */
class ScrollIndicators extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollTop: 0
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
        scrollTop: this.menuRef.current.scrollTop
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
          onScroll: this.handleScroll
        })}
        {this.contentHiddenBelow() && <ScrollIndicatorBottom />}
      </div>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

ScrollIndicators.propTypes = {
  children: PropTypes.element.isRequired
};

export default ScrollIndicators;
