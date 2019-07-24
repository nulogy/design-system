import React from "react";

const preventIOSScroll = e => {
  e.preventDefault();
};

const defaultFnc = e => {};

class LockBodyScroll extends React.Component {
  constructor(props) {
    super();
    const initialBodyOverflow = undefined;
  }

  componentDidMount() {
    this.initialBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.addEventListener("touchmove", preventIOSScroll, { passive: false });
    this.props.newScrollingContainer.addEventListener("touchmove", defaultFnc, { passive: false });
  }

  componentWillUnmount() {
    document.body.style.overflow = this.initialBodyOverflow;
    document.body.removeEventListener("touchmove", preventIOSScroll, { passive: false });
    this.props.newScrollingContainer.removeEventListener("touchmove", defaultFnc, { passive: false });
  }

  render() {
    return null;
  }
}

export default LockBodyScroll;
