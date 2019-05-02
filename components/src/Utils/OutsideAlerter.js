import React from "react";
import PropTypes from "prop-types";

class OutsideAlerter extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { handleClickOutside } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      handleClickOutside();
    }
  }

  render() {
    const { children } = this.props;

    return <div ref={ this.setWrapperRef }>{ children }</div>;
  }
}

OutsideAlerter.propTypes = {
  handleClickOutside: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
