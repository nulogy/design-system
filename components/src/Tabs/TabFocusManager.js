import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { Icon } from "../Icon";
import { keyCodes } from "../utils";

class TabFocusManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedIndex: 0
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.focusNextTab = this.focusNextTab.bind(this);
    this.focusPreviousTab = this.focusPreviousTab.bind(this);
    this.setFocusToTab = this.setFocusToTab.bind(this);
  }

  focusNextTab() {
    this.setState(
      prevState => ({
        focusedIndex: prevState.focusedIndex === this.props.tabRefs.length - 1 ? 0 : prevState.focusedIndex + 1
      }),
      this.updateFocusedTab
    );
  }

  focusPreviousTab() {
    this.setState(
      prevState => ({
        focusedIndex: prevState.focusedIndex === 0 ? this.props.tabRefs.length - 1 : prevState.focusedIndex - 1
      }),
      this.updateFocusedTab
    );
  }

  updateFocusedTab() {
    this.props.tabRefs[this.state.focusedIndex].focus();
  }

  setFocusToTab(index) {
    console.log(index);
    this.setState(
      {
        focusedIndex: index
      },
      this.updateFocusedTab
    );
  }

  onKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        this.focusPreviousTab();
        break;

      case "ArrowRight":
        e.preventDefault();
        this.focusNextTab();
        break;

      default:
        break;
    }
  }

  render() {
    const { focusedIndex } = this.state;

    return (
      <>
        {this.props.children({
          focusedIndex,
          onKeyDown: this.onKeyDown,
          setFocusToTab: this.setFocusToTab
        })}
      </>
    );
  }
}

export default TabFocusManager;
