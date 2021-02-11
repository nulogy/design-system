import React from "react";
import PropTypes from "prop-types";
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

class PreventBodyElementScrolling extends React.Component {
  componentDidMount() {
    const { scrollableRef } = this.props;
    const refs = Array.isArray(scrollableRef) ? scrollableRef : [scrollableRef];
    refs.every(disableBodyScroll);
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

PreventBodyElementScrolling.propTypes = {
  children: PropTypes.node,
  scrollableRef: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
};

PreventBodyElementScrolling.defaultProps = {
  children: null,
  scrollableRef: null,
};
export default PreventBodyElementScrolling;
