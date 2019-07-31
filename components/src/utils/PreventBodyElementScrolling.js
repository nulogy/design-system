import React from "react";
import PropTypes from "prop-types";

class PreventBodyElementScrolling extends React.Component {
  componentDidMount() {
    this.initialBodyOverflowX = document.body.style.overflowX;
    this.initialBodyOverflowY = document.body.style.overflowY;
    this.initialBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflowX = this.initialBodyOverflowX;
    document.body.style.overflowY = this.initialBodyOverflowY;
    document.body.style.overflow = this.initialBodyOverflow;
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

PreventBodyElementScrolling.propTypes = {
  children: PropTypes.node
};

PreventBodyElementScrolling.defaultProps = {
  children: null
};
export default PreventBodyElementScrolling;
