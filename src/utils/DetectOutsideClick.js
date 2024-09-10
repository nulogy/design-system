import React from "react";

export default class DetectOutsideClick extends React.Component {
  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("touchstart", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("touchstart", this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    const { onClick, clickRef } = this.props;
    const clickRefs = Array.isArray(clickRef) ? clickRef : [clickRef];

    if (clickRefs.every(clickedOutsideRef)) {
      onClick(e);
    }

    function clickedOutsideRef(ref) {
      if (ref) {
        if (ref.contains) {
          return !ref.contains(e.target) && ref !== e.target;
        }
        if (ref.current) {
          return ref !== e.target && !ref.current.contains(e.target);
        }
      }
    }
  }

  render() {
    const { children } = this.props;

    return <>{children}</>;
  }
}
