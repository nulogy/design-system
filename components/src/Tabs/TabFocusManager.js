import React from "react";
import PropTypes from "prop-types";

class TabFocusManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedIndex: 0
    };

    this.handleArrowNavigation = this.handleArrowNavigation.bind(this);
    this.focusNextTab = this.focusNextTab.bind(this);
    this.focusPreviousTab = this.focusPreviousTab.bind(this);
    this.setFocusToTab = this.setFocusToTab.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusedIndex } = this.state;
    if (prevState.focusedIndex !== focusedIndex) {
      this.updateFocusedTab();
    }
  }

  setFocusToTab(index) {
    this.setState({
      focusedIndex: index
    });
  }

  handleArrowNavigation(e) {
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

  focusNextTab() {
    const { tabRefs } = this.props;

    this.setState(prevState => ({
      focusedIndex: (prevState.focusedIndex + 1) % tabRefs.length
    }));
  }

  focusPreviousTab() {
    const { tabRefs } = this.props;

    this.setState(prevState => ({
      focusedIndex: (prevState.focusedIndex - 1 + tabRefs.length) % tabRefs.length
    }));
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
          handleArrowNavigation: this.handleArrowNavigation,
          setFocusToTab: this.setFocusToTab
        })}
      </>
    );
  }
}

TabFocusManager.propTypes = {
  children: PropTypes.func.isRequired,
  tabRefs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.elementType, focus: PropTypes.func }))
};

TabFocusManager.defaultProps = {
  tabRefs: undefined
};

export default TabFocusManager;
