import React from "react";

class LockBodyScroll extends React.Component {
  constructor(props) {
    super();
    const initialBodyOverflow = undefined;
  }

  componentDidMount() {
    this.initialBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = this.initialBodyOverflow;
  }

  render() {
    return null;
  }
}

export default LockBodyScroll;
