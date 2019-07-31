import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";
import { Icon } from "../Icon";
import { TabFocusManager, TabScrollManager } from ".";

const TabScrollIndicatorButton = styled.button.attrs(({ side, scrollLeft }) => ({
  style: {
    left: side === "left" ? scrollLeft : undefined,
    right: side === "right" ? scrollLeft * -1 : undefined
  }
}))({
  position: "absolute",
  color: theme.colors.black,
  top: 0,
  bottom: 0,
  height: theme.space.x5,
  width: theme.space.x5,
  background: theme.colors.white,
  opacity: 0.8,
  zIndex: theme.zIndex.tabsScollIndicator,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: theme.fontWeights.medium,
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  backgroundColor: theme.colors.white,
  border: `0px solid`,
  margin: theme.space.none,
  "&:hover": {
    backgroundColor: theme.colors.lightBlue
  },
  "&:focus": {
    outline: "none"
  },
  "&:active": {},
  "&:disabled": {
    opacity: ".5"
  }
});

class TabScrollIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.side);
  }

  render() {
    return (
      <TabScrollIndicatorButton
        {...this.props}
        onClick={this.handleClick}
        side={this.props.side}
        scrollLeft={this.props.scrollLeft}
      >
        <Icon icon={this.props.side === "right" ? "rightArrow" : "leftArrow"} />
      </TabScrollIndicatorButton>
    );
  }
}

export default TabScrollIndicator;
