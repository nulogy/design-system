import React from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

export default class PreventBodyElementScrolling extends React.Component {
  componentDidMount() {
    const { scrollableRef } = this.props;
    const refs = Array.isArray(scrollableRef) ? scrollableRef : [scrollableRef];
    refs.every((ref) => {
      if (ref && ref.current) {
        disableBodyScroll(ref.current);
      }
    });
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
