import React from "react";
import PropTypes from "prop-types";

class DetectOutsideClick extends React.Component {
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
    const { onClick } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      onClick(e);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div
        ref={node => {
          this.wrapperRef = node;
        }}
      >
        {children}
      </div>
    );
  }
}

DetectOutsideClick.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default DetectOutsideClick;
