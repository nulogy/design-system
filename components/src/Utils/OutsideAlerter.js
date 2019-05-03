import React from "react";
import PropTypes from "prop-types";

class OutsideAlerter extends React.Component {
  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    const { handleOutsideClick } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      handleOutsideClick(e);
    }
  }

  render() {
    const { children } = this.props;

    return <div ref={ node => this.wrapperRef = node }>{ children }</div>;
  }
}

OutsideAlerter.propTypes = {
  handleOutsideClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
