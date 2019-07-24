import React from "react";

const preventIOSScroll = e => {
  e.preventDefault();
};

class LockBodyScrollForDesktopAndIOS extends React.Component {
  constructor() {
    super();
    const initialBodyOverflow = undefined;
  }

  componentDidMount() {
    this.initialBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.addEventListener("touchmove", preventIOSScroll, { passive: false });
  }

  componentWillUnmount() {
    document.body.style.overflow = this.initialBodyOverflow;
    document.body.removeEventListener("touchmove", preventIOSScroll, { passive: false });
  }

  render() {
    return null;
  }
}

export default LockBodyScrollForDesktopAndIOS;
