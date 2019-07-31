import React from "react";
import PropTypes from "prop-types";

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

  setFocusToTab(index) {
    this.setState(
      {
        focusedIndex: index
      },
      this.updateFocusedTab
    );
  }

  focusNextTab() {
    const { tabRefs } = this.props;

    this.setState(
      prevState => ({
        focusedIndex: prevState.focusedIndex === tabRefs.length - 1 ? 0 : prevState.focusedIndex + 1
      }),
      this.updateFocusedTab
    );
  }

  focusPreviousTab() {
    const { tabRefs } = this.props;

    this.setState(
      prevState => ({
        focusedIndex: prevState.focusedIndex === 0 ? tabRefs.length - 1 : prevState.focusedIndex - 1
      }),
      this.updateFocusedTab
    );
  }

  updateFocusedTab() {
    const { tabRefs } = this.props;
    const { focusedIndex } = this.state;

    tabRefs[focusedIndex].focus();
  }

  render() {
    const { focusedIndex } = this.state;
    const { children } = this.props;

    return (
      <>
        {children({
          focusedIndex,
          onKeyDown: this.onKeyDown,
          setFocusToTab: this.setFocusToTab
        })}
      </>
    );
  }
}

TabFocusManager.propTypes = {
  children: PropTypes.func.isRequired,
  tabRefs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.instanceOf(Element) }))
};

TabFocusManager.defaultProps = {
  tabRefs: undefined
};

export default TabFocusManager;
