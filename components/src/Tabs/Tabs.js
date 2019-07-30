import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React, { PureComponent } from "react";
import ReactResizeDetector from "react-resize-detector";

const TabContainer = styled.div({
  display: "flex",
  whiteSpace: "nowrap",
  overflowX: "scroll",
  overflowY: "hidden",
  "::-webkit-scrollbar": {
    display: "none"
  },
  position: "relative",
  "&:before": {
    content: "''",
    backgroundColor: theme.colors.grey,
    height: "1px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

const ScrollIndicatorButton = styled.button(({ side, scrollLeft }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: side === "left" ? scrollLeft : undefined,
  right: side === "right" ? scrollLeft * -1 : undefined,
  height: theme.space.x6,
  width: theme.space.x6,
  background: theme.colors.lightGrey,
  opacity: 0.8,
  zIndex: theme.zIndex.overlay
}));

class ScrollIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.side);
  }

  render() {
    return (
      <ScrollIndicatorButton onClick={this.handleClick} side={this.props.side} scrollLeft={this.props.scrollLeft} />
    );
  }
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.selectedIndex || null,
      scrollLeft: 0,
      offsetWidth: 0,
      scrollWidth: 0
    };

    this.tabsRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.handleResize();
  }

  handleResize() {
    this.setState({
      offsetWidth: this.tabsRef.current.offsetWidth,
      scrollWidth: this.tabsRef.current.scrollWidth
    });
  }

  handleScroll() {
    console.log(this.state);
    if (this.tabsRef.current) {
      this.setState({
        scrollLeft: this.tabsRef.current.scrollLeft
      });
    }
  }

  contentHiddenRight() {
    console.log(this.state.scrollLeft + this.state.offsetWidth < this.state.scrollWidth);
    return this.state.scrollLeft + this.state.offsetWidth < this.state.scrollWidth;
  }

  contentHiddenLeft() {
    return this.state.scrollLeft !== 0 && this.state.offsetWidth < this.state.scrollWidth;
  }

  handleTabClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  handleIndicatorClick(side) {
    console.log("clicked" + side);
  }

  render() {
    const { children, fitted } = this.props;
    const { selectedIndex, scrollLeft } = this.state;

    return (
      <TabContainer onScroll={this.handleScroll} ref={this.tabsRef}>
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
        {this.contentHiddenLeft() && (
          <ScrollIndicator side="left" scrollLeft={scrollLeft} onClick={this.handleIndicatorClick} />
        )}
        {React.Children.map(children, (tab, index) =>
          React.cloneElement(tab, {
            onClick: this.props.selectedIndex
              ? tab.props.onClick
              : () => {
                  this.handleTabClick(index);
                },
            index: index,
            selected: index === selectedIndex ? true : false,
            fullWidth: fitted
          })
        )}
        {this.contentHiddenRight() && (
          <ScrollIndicator side="right" scrollLeft={scrollLeft} onClick={this.handleIndicatorClick} />
        )}
      </TabContainer>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  selectedIndex: PropTypes.number
};

Tabs.defaultProps = {
  children: null,
  selectedIndex: undefined
};

export default Tabs;
